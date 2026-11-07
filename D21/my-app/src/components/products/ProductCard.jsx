import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/format";

export default function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover bg-slate-100"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2.5 py-0.5 rounded-md inline-block mb-2">
                        {product.categoryName}
                    </span>
                    <p className="font-semibold text-slate-800 text-sm mb-1 line-clamp-2">
                        {product.name}
                    </p>
                    <div className="text-base font-bold text-red-500 mb-3">
                        {formatPrice(product.price)}
                    </div>
                </div>

                <Link
                    to={`/products/${product.id}`}
                    className="w-full text-center py-2 px-3 bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                    <span>Xem chi tiết</span>
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </Link>
            </div>
        </div>
    );
}
