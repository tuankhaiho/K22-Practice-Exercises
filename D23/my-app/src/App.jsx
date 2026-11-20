import { useState, useRef, useCallback } from "react";
import NoteTitleInput from "./components/NoteTitleInput";
import NoteItem from "./components/NoteItem";
import { useNoteFilter } from "./hooks/useNoteFilter";
import { dataNotes } from "./data/dataNote";

export default function App() {
    const [notes, setNotes] = useState(dataNotes);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const titleRef = useRef(null);

    const { keyword, setKeyword, filterMode, setFilterMode, filteredNotes } =
        useNoteFilter(notes);

    const handleToggleImportant = useCallback((id) => {
        setNotes((prev) =>
            prev.map((note) =>
                note.id === id ? { ...note, isImportant: !note.isImportant } : note,
            ),
        );
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        const cleanTitle = title.trim();

        if (!cleanTitle) {
            setError("Tiêu đề không được để trống hoặc chỉ gồm khoảng trắng.");
            titleRef.current?.focus();
            return;
        }

        setNotes((prev) => [
            {
                id: crypto.randomUUID(),
                title: cleanTitle,
                content: content.trim(),
                isImportant: false,
            },
            ...prev,
        ]);
        setTitle("");
        setContent("");
        setError("");
        titleRef.current?.focus();
    }

    return (
        <main className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-6">
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center justify-center gap-2.5">
                        <span>Ghi chú học tập</span>
                    </h1>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 space-y-3.5"
                >
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                            Tiêu đề
                        </label>
                        <NoteTitleInput
                            ref={titleRef}
                            value={title}
                            onChange={(val) => {
                                setTitle(val);
                                if (error) setError("");
                            }}
                            invalid={Boolean(error)}
                        />
                        {error && (
                            <span role="alert" className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1">
                                <i className="fa-solid fa-circle-exclamation text-xs"></i>
                                {error}
                            </span>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                            Nội dung
                        </label>
                        <input
                            type="text"
                            placeholder="Nhập nội dung ghi chú..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-xl text-sm transition shadow-sm hover:shadow cursor-pointer flex items-center justify-center gap-2"
                    >
                        <i className="fa-solid fa-plus text-xs"></i>
                        <span>Thêm ghi chú</span>
                    </button>
                </form>

                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                    <div className="relative flex-1">
                        <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
                        <input
                            type="search"
                            placeholder="Tìm kiếm theo tiêu đề hoặc nội dung..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition outline-none"
                        />
                    </div>
                    <div className="flex gap-1 p-1 bg-slate-100 rounded-xl self-start sm:self-auto">
                        <button
                            type="button"
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                                filterMode === "all"
                                    ? "bg-white text-blue-600 shadow-xs font-semibold"
                                    : "text-slate-600 hover:text-slate-900"
                            }`}
                            onClick={() => setFilterMode("all")}
                        >
                            <i className="fa-solid fa-list-ul text-xs"></i>
                            <span>Tất cả</span>
                        </button>
                        <button
                            type="button"
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                                filterMode === "important"
                                    ? "bg-white text-amber-600 shadow-xs font-semibold"
                                    : "text-slate-600 hover:text-slate-900"
                            }`}
                            onClick={() => setFilterMode("important")}
                        >
                            <i className="fa-solid fa-star text-xs"></i>
                            <span>Quan trọng</span>
                        </button>
                    </div>
                </div>

                <div className="text-xs font-medium text-slate-500 px-1 flex justify-between items-center">
                    <span>
                        Hiển thị <strong className="text-slate-700">{filteredNotes.length}</strong> / {notes.length} ghi chú
                    </span>
                </div>

                {filteredNotes.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400 space-y-2">
                        <i className="fa-regular fa-folder-open text-3xl text-slate-300 block"></i>
                        <p className="text-sm">Không có ghi chú nào phù hợp</p>
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {filteredNotes.map((note) => (
                            <NoteItem
                                key={note.id}
                                note={note}
                                onToggleImportant={handleToggleImportant}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </main>
    );
}
