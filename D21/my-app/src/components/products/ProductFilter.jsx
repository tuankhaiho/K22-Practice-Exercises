import { useSearchParams } from "react-router-dom";
import { CATEGORIES } from "../../data/products";

export default function ProductFilter() {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentKeyword = searchParams.get("keyword") || "";
    const currentCategory = searchParams.get("category") || "all";

    const handleKeywordChange = (e) => {
        const value = e.target.value;
        const nextParams = new URLSearchParams(searchParams);
        if (value.trim()) {
            nextParams.set("keyword", value);
        } else {
            nextParams.delete("keyword");
        }
        setSearchParams(nextParams, { replace: true });
    };

    const handleCategoryChange = (e) => {
        const val = e.target.value;
        const nextParams = new URLSearchParams(searchParams);
        if (val && val !== "all") {
            nextParams.set("category", val);
        } else {
            nextParams.delete("category");
        }
        setSearchParams(nextParams);
    };

    const handleReset = () => {
        setSearchParams({});
    };

    const hasFilter = Boolean(currentKeyword || (currentCategory && currentCategory !== "all"));

    return (
        <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6 flex items-center gap-3">
            <div className="relative flex-1">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                <input
                    type="text"
                    value={currentKeyword}
                    onChange={handleKeywordChange}
                    placeholder="Tìm kiếm sản phẩm theo tên..."
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
            </div>

            <div className="w-60">
                <select
                    value={currentCategory}
                    onChange={handleCategoryChange}
                    className="w-full py-2 px-3 border border-slate-200 rounded-lg text-sm bg-white text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                    {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            {hasFilter && (
                <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors whitespace-nowrap"
                >
                    <i className="fa-solid fa-rotate-left mr-1.5"></i>
                    Đặt lại
                </button>
            )}
        </div>
    );
}
