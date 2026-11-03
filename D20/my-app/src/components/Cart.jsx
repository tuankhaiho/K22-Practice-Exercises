import CartItem from "./CartItem";
import { formatPrice } from "../utils/format";

function Cart({
    cartItems,
    onIncreaseQuantity,
    onDecreaseQuantity,
    onRemoveItem,
}) {
    const totalQuantity = cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
    );
    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );

    const isEmpty = cartItems.length === 0;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col h-fit">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span>Giỏ hàng</span>
                    <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2.5 py-0.5 rounded-full">
                        {totalQuantity} món
                    </span>
                </div>
            </div>

            <div className="my-4">
                {isEmpty ? (
                    <div className="py-10 px-4 text-center text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                        <i className="fa-solid fa-basket-shopping text-5xl text-gray-300 mb-3 block"></i>
                        <p className="font-medium text-gray-600">
                            Giỏ hàng của bạn đang trống
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                        {cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onIncreaseQuantity={onIncreaseQuantity}
                                onDecreaseQuantity={onDecreaseQuantity}
                                onRemoveItem={onRemoveItem}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Tổng số lượng:</span>
                    <span className="font-bold text-gray-900">
                        {totalQuantity}
                    </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-gray-800 pt-2 border-t border-gray-200">
                    <span>Tổng tiền:</span>
                    <span className="text-lg font-bold text-red-500">
                        {formatPrice(totalPrice)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Cart;
