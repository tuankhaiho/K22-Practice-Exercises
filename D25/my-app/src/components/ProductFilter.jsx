import { useMemo, useState } from "react";

const PRODUCTS = Array.from({ length: 1000 }, (_, index) => {
    const categories = [
        "Điện thoại",
        "Laptop",
        "Thời trang",
        "Gia dụng",
        "Sách",
    ];

    return {
        id: index + 1,
        name: `Sản phẩm ${index + 1}`,
        category: categories[index % categories.length],
        price: (index % 50) * 20 + 100,
        rating: (index % 5) + 1,
    };
});

const CATEGORY_OPTIONS = [
    "Tất cả",
    "Điện thoại",
    "Laptop",
    "Thời trang",
    "Gia dụng",
    "Sách",
];

const SORT_OPTIONS = [
    { value: "default", label: "Mặc định" },
    { value: "price-asc", label: "Giá tăng dần" },
    { value: "price-desc", label: "Giá giảm dần" },
];

export default function ProductFilter() {
    const [count, setCount] = useState(0);
    const [keyword, setKeyWord] = useState("");
    const [category, setCategory] = useState("Tất cả");
    const [sortType, setSortType] = useState("default");

    const filteredProducts = useMemo(() => {
        console.log("ĐANG LỌC VÀ SẮP XẾP LẠI DANH SÁCH...");
        const normalizedKeyword = keyword.trim().toLowerCase();
        const result = PRODUCTS.filter((product) => {
            const matchName = product.name
                .toLowerCase()
                .includes(normalizedKeyword);

            const matchCategory =
                category === "Tất cả" || product.category === category;
            return matchName && matchCategory;
        });

        if (sortType === "price-asc") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortType === "price-desc") {
            result.sort((a, b) => b.price - a.price);
        }
        return result;
    }, [keyword, category, sortType]);

    return (
        <div className="mx-auto max-w-4xl space-y-6 p-6">
            <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-lg font-semibold pb-3">
                    Kiểm tra re-render
                </div>
                <div className="flex gap-4 items-center">
                    <button
                        type="button"
                        onClick={() => setCount((prev) => prev + 1)}
                        className="rounded-lg border border-slate-200 bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                    >
                        Tăng count
                    </button>
                    <span>
                        Count: <strong>{count}</strong>
                    </span>
                </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <div className=" mb-3 text-lg font-semibold">
                    Bộ lọc và sắp xếp
                </div>
                <div className="grid gap-3 grid-cols-3">
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyWord(e.target.value)}
                        placeholder="Tìm theo tên sản phẩm..."
                        className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-blue-500 "
                    >
                        {CATEGORY_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                        className="rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-blue-500 "
                    >
                        {SORT_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </section>

            <section>
                <p className="mb-3 text-sm text-slate-600">
                    Tìm thấy <strong>{filteredProducts.length}</strong> /{" "}
                    {PRODUCTS.length} sản phẩm
                </p>

                {filteredProducts.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                        Không tìm thấy sản phẩm nào phù hợp.
                    </div>
                ) : (
                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {filteredProducts.map((product) => (
                            <li
                                key={product.id}
                                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                            >
                                <div className="font-semibold">
                                    {product.name}
                                </div>
                                <p className="text-sm text-slate-500">
                                    {product.category}
                                </p>
                                <div className="mt-2 flex items-center justify-between">
                                    <span className="font-bold text-blue-600">
                                        {product.price}k
                                    </span>
                                    <span className="text-sm">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <i
                                                key={i}
                                                className={`fa-solid fa-star text-xs ${
                                                    i < product.rating
                                                        ? "text-amber-500"
                                                        : "text-slate-300"
                                                }`}
                                            />
                                        ))}
                                        <span className="ml-1 text-slate-600">
                                            ({product.rating} sao)
                                        </span>
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
