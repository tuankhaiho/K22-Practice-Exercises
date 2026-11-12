import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";

const API = "https://dummyjson.com/products";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState("loading");
    const [error, setError] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("q") ?? "";

    useEffect(() => {
        const controller = new AbortController();
        async function fetchProducts() {
            setStatus("loading");
            setError(null);
            try {
                const res = await fetch(API, { signal: controller.signal });
                if (!res.ok) throw new Error(`Lỗi HTTP: ${res.status}`);
                const data = await res.json();
                setProducts(data.products ?? []);
                setStatus("success");
            } catch (error) {
                if (error.name === "AbortError") return;
                setError(error.message || "Không tải được sản phẩm");
                setStatus("error");
            }
        }

        fetchProducts();
        return () => controller.abort();
    }, []);

    const filteredProducts = useMemo(() => {
        const result = keyword.trim().toLowerCase();
        if (!result) return products;
        return products.filter(
            (product) =>
                product.title.toLowerCase().includes(result) ||
                product.category.toLowerCase().includes(result),
        );
    }, [products, keyword]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Danh sách sản phẩm
                    </h1>
                </div>

                <div className="relative w-full sm:w-72">
                    <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                        type="search"
                        placeholder="Tìm theo tên, danh mục..."
                        value={keyword}
                        onChange={(e) => {
                            const val = e.target.value;
                            setSearchParams(val ? { q: val } : {});
                        }}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                </div>
            </div>

            {status === "loading" && (
                <div className="text-center py-16">
                    <i className="fa-solid fa-spinner fa-spin text-3xl text-blue-600 mb-3"></i>
                    <p className="text-slate-600 font-medium">
                        Đang tải sản phẩm...
                    </p>
                </div>
            )}

            {status === "error" && (
                <div className="text-center py-16 bg-red-50 rounded-xl border border-red-100 p-6">
                    <i className="fa-solid fa-triangle-exclamation text-3xl text-red-500 mb-3"></i>
                    <p className="text-red-700 font-semibold mb-2">
                        Đã xảy ra lỗi!
                    </p>
                    <p className="text-sm text-red-500 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                        Thử lại
                    </button>
                </div>
            )}

            {status === "success" && (
                <>
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-6">
                            <i className="fa-solid fa-box-open text-4xl text-slate-300 mb-3"></i>
                            <p className="text-slate-600 font-medium mb-3">
                                Không tìm thấy sản phẩm nào phù hợp với từ khóa
                                "{keyword}".
                            </p>
                            <button
                                onClick={() => setSearchParams({})}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                            >
                                Xóa bộ lọc
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
