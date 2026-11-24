import { useUiStore } from "../store/useUiStore";

export default function SearchBox() {
    const searchText = useUiStore((s) => s.searchText);
    const setSearchText = useUiStore((s) => s.setSearchText);

    return (
        <div className="relative w-full sm:max-w-sm">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
                type="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Tìm theo tên sản phẩm..."
                className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-4 shadow-sm
                     outline-none transition focus:border-blue-500"
            />
        </div>
    );
}
