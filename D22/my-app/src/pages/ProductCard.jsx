import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col">
            <Link
                to={`/products/${product.id}`}
                className="flex-1 flex flex-col"
            >
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-56 object-cover bg-slate-100"
                />
                <div className="p-4 flex-1">
                    <span className="text-sm text-blue-600 font-semibold bg-blue-50 px-2.5 py-1 rounded-sm inline-block mb-2">
                        {product.category}
                    </span>
                    <p className="font-semibold text-slate-800 text-sm mb-1 line-clamp-1 hover:text-blue-600 transition-colors">
                        {product.title}
                    </p>
                    <div className="text-base font-bold text-red-500">
                        {product.price} $
                    </div>
                </div>
            </Link>

            <div className="p-4 pt-0">
                <button
                    onClick={() => addToCart(product)}
                    className="w-full text-center py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                    <i className="fa-solid fa-cart-plus text-xs"></i>
                    <span>Thêm vào giỏ hàng</span>
                </button>
            </div>
        </div>
    );
}
