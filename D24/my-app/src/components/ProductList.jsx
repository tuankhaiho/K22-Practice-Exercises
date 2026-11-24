import { useMemo } from "react";
import { useProducts } from "../api/products";
import { useUiStore } from "../store/useUiStore";
import ProductCard from "./ProductCard.jsx";

const Message = ({ children, tone = "text-slate-500" }) => (
    <div
        className={`rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center ${tone}`}
    >
        {children}
    </div>
);

export default function ProductList() {
    const { data, isPending, isError, error, refetch } = useProducts();
    const searchText = useUiStore((s) => s.searchText);
    const filterMode = useUiStore((s) => s.filterMode);
    const favoriteIds = useUiStore((s) => s.favoriteIds);

    const filtered = useMemo(() => {
        if (!data) return [];
        const keyword = searchText.trim().toLowerCase();
        return data.products.filter((p) => {
            const matchText = p.title.toLowerCase().includes(keyword);
            const matchFav = filterMode === "all" || favoriteIds.includes(p.id);
            return matchText && matchFav;
        });
    }, [data, searchText, filterMode, favoriteIds]);

    if (isPending)
        return (
            <Message>
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                Đang tải...
            </Message>
        );

    if (isError) {
        return (
            <Message tone="text-red-600">
                <p className="font-medium">
                    Không thể tải sản phẩm: {error.message}
                </p>
                <button
                    onClick={() => refetch()}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                    <i className="fa-solid fa-rotate-right"></i>
                    <span>Thử lại</span>
                </button>
            </Message>
        );
    }

    if (filtered.length === 0)
        return <Message>Không có sản phẩm nào phù hợp.</Message>;

    return (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </ul>
    );
}
