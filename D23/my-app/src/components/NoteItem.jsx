import { memo } from "react";

function NoteItem({ note, onToggleImportant }) {
    return (
        <li
            className={`p-4 rounded-2xl border transition-all duration-150 flex items-start justify-between gap-4 ${
                note.isImportant
                    ? "bg-red-100 border-red-500 shadow-xs"
                    : "bg-white border-slate-200/80 hover:border-slate-300 shadow-xs"
            }`}
        >
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <strong className="text-base font-semibold text-slate-900 wrap-break-word">
                        {note.title}
                    </strong>
                </div>
                {note.content && (
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed wrap-break-word whitespace-pre-wrap">
                        {note.content}
                    </p>
                )}
            </div>
            <button
                type="button"
                onClick={() => onToggleImportant(note.id)}
                className={`shrink-0 text-xs font-medium px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                    note.isImportant
                        ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
            >
                <i
                    className={
                        note.isImportant
                            ? "fa-solid fa-star text-amber-600"
                            : "fa-regular fa-star text-slate-400"
                    }
                ></i>
                <span>{note.isImportant ? "Bỏ quan trọng" : "Đánh dấu"}</span>
            </button>
        </li>
    );
}
export default memo(NoteItem);
