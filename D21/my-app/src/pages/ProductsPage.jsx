import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/products/ProductCard";
import ProductFilter from "../components/products/ProductFilter";

export default function ProductsPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const keyword = searchParams.get("keyword") || "";
    const category = searchParams.get("category") || "all";

    const filteredProducts = useMemo(() => {
        const trimmedKeyword = keyword.trim().toLowerCase();

        return PRODUCTS.filter((product) => {
            const matchCategory =
                category === "all" ||
                product.category.toLowerCase() === category.toLowerCase();

            const matchKeyword =
                !trimmedKeyword ||
                product.name.toLowerCase().includes(trimmedKeyword) ||
                product.description.toLowerCase().includes(trimmedKeyword);

            return matchCategory && matchKeyword;
        });
    }, [keyword, category]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-2xl font-bold text-slate-900 mb-6">
                Danh sách sản phẩm
            </div>

            <ProductFilter />

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-4 gap-5">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                    <i className="fa-solid fa-box-open text-3xl text-slate-300 mb-3 block"></i>
                    <p className="text-slate-600 font-medium mb-3">
                        Không tìm thấy sản phẩm nào phù hợp.
                    </p>
                    <button
                        type="button"
                        onClick={() => setSearchParams({})}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                        Xóa bộ lọc
                    </button>
                </div>
            )}
        </div>
    );
}
