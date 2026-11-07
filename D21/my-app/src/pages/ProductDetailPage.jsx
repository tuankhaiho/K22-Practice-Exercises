import { useParams, useNavigate, Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { formatPrice } from "../utils/format";

export default function ProductDetailPage() {
    const { productId } = useParams();
    const navigate = useNavigate();

    const product = PRODUCTS.find((p) => p.id === productId);

    if (!product) {
        return (
            <div className="max-w-xl mx-auto px-4 py-16 text-center">
                <i className="fa-solid fa-triangle-exclamation text-4xl text-amber-500 mb-3 block"></i>
                <div className="text-xl font-bold text-slate-800 mb-2">
                    Sản phẩm không tồn tại
                </div>
                <p className="text-sm text-slate-500 mb-6">
                    Không tìm thấy sản phẩm có mã ID "{productId}".
                </p>
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                    <i className="fa-solid fa-arrow-left text-xs"></i>
                    <span>Quay lại danh sách</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-6">
                <button
                    type="button"
                    onClick={() => navigate("/products")}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold transition-colors shadow-xs"
                >
                    <i className="fa-solid fa-arrow-left text-xs"></i>
                    <span>Quay lại danh sách</span>
                </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="grid grid-cols-2 gap-8 items-start">
                    <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="space-y-4">
                        <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2.5 py-1 rounded-md inline-block">
                            {product.categoryName}
                        </span>

                        <div className="text-2xl font-bold text-slate-900 leading-snug">
                            {product.name}
                        </div>

                        <div className="text-2xl font-extrabold text-blue-600">
                            {formatPrice(product.price)}
                        </div>

                        <div className="border-t border-slate-100 pt-4">
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        <div className="pt-4">
                            <button
                                type="button"
                                onClick={() => navigate("/products")}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
                            >
                                <i className="fa-solid fa-arrow-left text-xs"></i>
                                <span>Quay lại danh sách</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
