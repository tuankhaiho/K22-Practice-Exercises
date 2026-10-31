import React from "react";
import Badge from "./Badge";

export default function ProductItem({ product, onAddToCart }) {
    const { name, price, image, inStock, discountPercent } = product;
    const discountedPrice =
        discountPercent > 0 ? price * (1 - discountPercent / 100) : price;
    const formatPrice = (val) => val.toLocaleString("vi-VN") + "đ";
    return (
        <div
            className={`relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                !inStock
                    ? "opacity-60 bg-gray-50"
                    : "hover:-translate-y-1 hover:shadow-xl"
            }`}
        >
            <Badge discountPercent={discountPercent} inStock={inStock}></Badge>
            <div className="w-full h-48 overflow-hidden bg-gray-100">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow justify-between">
                <h3
                    className="font-bold text-gray-800 text-lg mb-2 line-clamp-1"
                    title={name}
                >
                    {name}
                </h3>
                {discountPercent > 0 ? (
                    <>
                        <span className="text-red-600 font-extrabold text-lg">
                            {formatPrice(discountedPrice)}
                        </span>
                        <span className="text-gray-400 text-sm line-through">
                            {formatPrice(price)}
                        </span>
                    </>
                ) : (
                    <span className="text-gray-900 font-extrabold text-lg">
                        {formatPrice(price)}
                    </span>
                )}

                <button
                    onClick={() => onAddToCart(product, discountedPrice)}
                    disabled={!inStock}
                    className={`w-full mt-2 py-2.5 px-4 font-semibold text-sm rounded-xl transition duration-200 shadow-sm ${
                        inStock
                            ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer active:scale-95"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                    {inStock ? "Thêm vào giỏ" : "Hết hàng"}
                </button>
            </div>
        </div>
    );
}
