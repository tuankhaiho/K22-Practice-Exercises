import { formatPrice } from "../utils/format";

function ProductCard({ product, onAddToCart }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200">
            <div className="h-48 overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                <div>
                    <p className="font-semibold text-gray-800 text-base line-clamp-2">
                        {product.name}
                    </p>
                    <p className="text-lg font-bold text-red-500 mt-1">
                        {formatPrice(product.price)}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => onAddToCart(product.id)}
                    className="w-full py-2 px-4 bg-gray-500 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer"
                >
                    <i className="fa-solid fa-cart-plus text-base"></i>
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
