import { useUiStore } from "../store/useUiStore";

const OPTIONS = [
    { value: "all", label: "Tất cả" },
    { value: "favorites", label: "Yêu thích" },
];

export default function FilterToggle() {
    const filterMode = useUiStore((s) => s.filterMode);
    const setFilterMode = useUiStore((s) => s.setFilterMode);

    return (
        <div>
            {OPTIONS.map(({ value, label }) => (
                <button
                    key={value}
                    type="button"
                    aria-pressed={filterMode === value}
                    onClick={() => setFilterMode(value)}
                    className={`rounded-sm px-4 py-1.5 text-sm font-medium transition ${
                        filterMode === value
                            ? "bg-white text-blue-600 shadow"
                            : "text-slate-600 hover:text-slate-900"
                    }`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
