import { formatPrice } from "../utils/format";

function CartItem({
    item,
    onIncreaseQuantity,
    onDecreaseQuantity,
    onRemoveItem,
}) {
    const isDecreaseDisabled = item.quantity <= 1;
    const totalPrice = item.price * item.quantity;

    return (
        <div className="p-3.5 bg-white rounded-xl border border-gray-100 shadow-xs flex flex-col gap-3 hover:border-gray-200 transition-colors">
            <div className="flex items-start gap-3">
                {item.image && (
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-gray-100"
                    />
                )}
                <div className="flex-1 min-w-0">
                    <p
                        className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2"
                        title={item.name}
                    >
                        {item.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Đơn giá:{" "}
                        <span className="font-medium text-gray-700">
                            {formatPrice(item.price)}
                        </span>
                    </p>
                    <p className="text-xs text-red-500 font-semibold mt-0.5">
                        Thành tiền: <span>{formatPrice(totalPrice)}</span>
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                    <button
                        type="button"
                        onClick={() => onDecreaseQuantity(item.id)}
                        disabled={isDecreaseDisabled}
                        className={`w-8 h-8 flex items-center justify-center font-bold text-base transition-colors ${
                            isDecreaseDisabled
                                ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                                : "text-gray-700 hover:bg-gray-200 active:bg-gray-300 cursor-pointer"
                        }`}
                        title={
                            isDecreaseDisabled
                                ? "Số lượng tối thiểu là 1"
                                : "Giảm số lượng"
                        }
                    >
                        <i className="fa-solid fa-minus text-xs"></i>
                    </button>

                    <span className="w-10 text-center font-semibold text-sm text-gray-800 select-none">
                        {item.quantity}
                    </span>

                    <button
                        type="button"
                        onClick={() => onIncreaseQuantity(item.id)}
                        className="w-8 h-8 flex items-center justify-center font-bold text-base text-gray-700 hover:bg-gray-200 active:bg-gray-300 transition-colors cursor-pointer"
                        title="Tăng số lượng"
                    >
                        <i className="fa-solid fa-plus text-xs"></i>
                    </button>
                </div>

                <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg border border-red-200 transition-colors cursor-pointer flex items-center gap-1.5"
                    title="Xóa mặt hàng khỏi giỏ"
                >
                    <i className="fa-solid fa-trash-can text-xs"></i>
                    <span>Xóa</span>
                </button>
            </div>
        </div>
    );
}

export default CartItem;
