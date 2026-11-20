import { useMemo, useState } from "react";

export function useNoteFilter(notes) {
    const [keyword, setKeyword] = useState("");
    const [filterMode, setFilterMode] = useState("all");
    const filteredNotes = useMemo(() => {
        const query = keyword.trim().toLowerCase();
        return notes.filter((note) => {
            if (filterMode === "important" && !note.isImportant) return false;
            if (!query) return true;
            return (
                note.title.toLowerCase().includes(query) ||
                note.content.toLowerCase().includes(query)
            );
        });
    }, [notes, keyword, filterMode]);
    return { keyword, setKeyword, filterMode, setFilterMode, filteredNotes };
}
