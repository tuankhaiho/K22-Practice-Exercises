import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const API = "https://dummyjson.com/products";

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading");
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchProduct() {
            setStatus("loading");
            setError(null);
            try {
                const res = await fetch(`${API}/${id}`, {
                    signal: controller.signal,
                });
                if (!res.ok) {
                    if (res.status === 404) {
                        throw new Error("Không tìm thấy sản phẩm này");
                    }
                    throw new Error(`Lỗi kết nối: ${res.status}`);
                }
                const data = await res.json();
                setProduct(data);
                setSelectedImage(
                    data.thumbnail || (data.images && data.images[0]) || "",
                );
                setStatus("success");
            } catch (err) {
                if (err.name === "AbortError") return;
                setError(err.message || "Không tải được thông tin sản phẩm");
                setStatus("error");
            }
        }

        fetchProduct();
        return () => controller.abort();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleBuyNow = () => {
        if (!product) return;
        addToCart(product);
        navigate("/cart");
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-sm font-semibold transition-colors shadow-xs cursor-pointer"
                >
                    <i className="fa-solid fa-arrow-left text-xs"></i>
                    <span>Quay lại</span>
                </button>
            </div>

            {status === "loading" && (
                <div className="text-center py-24">
                    <i className="fa-solid fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
                    <p className="text-slate-600 font-medium">
                        Đang tải thông tin sản phẩm...
                    </p>
                </div>
            )}

            {status === "error" && (
                <div className="max-w-md mx-auto text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
                    <i className="fa-solid fa-triangle-exclamation text-4xl text-amber-500 mb-4 block"></i>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">
                        Đã xảy ra lỗi
                    </h2>
                    <p className="text-sm text-slate-500 mb-6">{error}</p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                        <i className="fa-solid fa-house text-xs"></i>
                        <span>Về trang danh sách</span>
                    </Link>
                </div>
            )}

            {status === "success" && product && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
                        <div className="flex flex-col gap-4">
                            <div className="w-full h-80 sm:h-96 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex items-center justify-center p-4">
                                <img
                                    src={selectedImage}
                                    alt={product.title}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            {product.images && product.images.length > 1 && (
                                <div className="flex gap-3 overflow-x-auto pb-2">
                                    {product.images.map((imgUrl, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() =>
                                                setSelectedImage(imgUrl)
                                            }
                                            className={`w-16 h-16 rounded-lg border-2 overflow-hidden shrink-0 bg-slate-50 p-1 cursor-pointer transition-all ${
                                                selectedImage === imgUrl
                                                    ? "border-blue-600 ring-2 ring-blue-100"
                                                    : "border-slate-200 hover:border-slate-300"
                                            }`}
                                        >
                                            <img
                                                src={imgUrl}
                                                alt={`${product.title} ${idx + 1}`}
                                                className="w-full h-full object-contain"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs uppercase tracking-wider text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full">
                                    {product.category}
                                </span>
                                {product.brand && (
                                    <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">
                                        Hãng: {product.brand}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                                {product.title}
                            </h1>

                            <div className="flex items-center gap-1.5 text-green-600 font-medium">
                                <i className="fa-solid fa-circle-check text-xs"></i>
                                <span>Còn hàng ({product.stock} sản phẩm)</span>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-slate-800 mb-2">
                                    Mô tả sản phẩm:
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                            {isAdded && (
                                <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm flex items-center gap-2">
                                    <i className="fa-solid fa-circle-check text-green-600"></i>
                                    <span>
                                        Đã thêm sản phẩm vào giỏ hàng thành
                                        công!
                                    </span>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                                >
                                    <i className="fa-solid fa-cart-plus"></i>
                                    <span>Thêm vào giỏ hàng</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
