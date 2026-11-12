import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
    const { cart, increase, decrease, remove, totalQuantity, totalPrice } =
        useCart();

    if (cart.length === 0) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-20 text-center">
                <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
                    <i className="fa-solid fa-cart-shopping"></i>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Giỏ hàng của bạn đang trống
                </h2>
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm cursor-pointer"
                >
                    <i className="fa-solid fa-arrow-left text-xs"></i>
                    <span>Xem danh sách sản phẩm</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
                Giỏ hàng của bạn
            </h1>
            <p className="text-sm text-slate-500 mb-8">
                Bạn đang có{" "}
                <span className="font-semibold text-blue-600">
                    {totalQuantity}
                </span>{" "}
                sản phẩm trong giỏ hàng
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                        <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-6 py-3.5 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <div className="col-span-6">Sản phẩm</div>
                            <div className="col-span-2 text-center">
                                Đơn giá
                            </div>
                            <div className="col-span-2 text-center">
                                Số lượng
                            </div>
                            <div className="col-span-2 text-right">
                                Thành tiền
                            </div>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="p-4 sm:p-6 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center"
                                >
                                    <div className="w-full sm:w-auto sm:col-span-6 flex items-center gap-4">
                                        <Link
                                            to={`/products/${item.id}`}
                                            className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 rounded-lg border border-slate-100 p-1 shrink-0 flex items-center justify-center hover:opacity-80 transition-opacity"
                                        >
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="max-h-full max-w-full object-contain"
                                            />
                                        </Link>
                                        <div className="min-w-0 flex-1">
                                            <Link
                                                to={`/products/${item.id}`}
                                                className="font-semibold text-slate-800 text-sm hover:text-blue-600 transition-colors line-clamp-2"
                                            >
                                                {item.title}
                                            </Link>
                                            {item.category && (
                                                <span className="text-xs text-slate-400 capitalize mt-0.5 block">
                                                    {item.category}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="w-full sm:w-auto sm:col-span-2 flex sm:justify-center items-center justify-between">
                                        <span className="sm:hidden text-xs text-slate-500">
                                            Đơn giá:
                                        </span>
                                        <span className="text-sm font-medium text-slate-700">
                                            ${item.price.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="w-full sm:w-auto sm:col-span-2 flex sm:justify-center items-center justify-between">
                                        <span className="sm:hidden text-xs text-slate-500">
                                            Số lượng:
                                        </span>
                                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                                            <button
                                                onClick={() =>
                                                    decrease(item.id)
                                                }
                                                disabled={item.quantity <= 1}
                                                className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                            >
                                                <i className="fa-solid fa-minus text-xs"></i>
                                            </button>
                                            <span className="w-9 text-center text-sm font-semibold text-slate-800 bg-white py-1">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    increase(item.id)
                                                }
                                                className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                                            >
                                                <i className="fa-solid fa-plus text-xs"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="w-full sm:w-auto sm:col-span-2 flex sm:justify-end items-center justify-between gap-4">
                                        <span className="sm:hidden text-xs text-slate-500">
                                            Thành tiền:
                                        </span>
                                        <span className="text-sm font-bold text-red-600">
                                            $
                                            {(
                                                item.price * item.quantity
                                            ).toFixed(2)}
                                        </span>
                                        <button
                                            onClick={() => remove(item.id)}
                                            title="Xóa khỏi giỏ hàng"
                                            className="text-slate-400 hover:text-red-500 p-1.5 transition-colors cursor-pointer"
                                        >
                                            <i className="fa-solid fa-trash-can text-sm"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-2">
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            <i className="fa-solid fa-arrow-left text-xs"></i>
                            <span>Tiếp tục mua hàng</span>
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs sticky top-20">
                    <h2 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
                        Tóm tắt đơn hàng
                    </h2>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between text-slate-600">
                            <span>Tạm tính ({totalQuantity} sản phẩm)</span>
                            <span className="font-semibold text-slate-800">
                                ${totalPrice.toFixed(2)}
                            </span>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                            <span className="text-base font-bold text-slate-800">
                                Tổng cộng
                            </span>
                            <span className="text-2xl font-extrabold text-red-600">
                                ${totalPrice.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
