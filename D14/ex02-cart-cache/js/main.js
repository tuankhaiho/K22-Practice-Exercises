const cart = new Map();

const voucherMap = new Map([
    ["SALE10", 10],
    ["SALE20", 20],
]);

const addToCart = function (productId, productInfo) {
    if (cart.has(productId)) {
        cart.get(productId).quantity += 1;
    } else {
        cart.set(productId, {
            name: productInfo.name,
            price: productInfo.price,
            quantity: 1,
        });
    }
};

addToCart(101, { name: "Áo thun", price: 150000 });
addToCart(102, { name: "Quần jeans", price: 300000 });
addToCart(101, { name: "Áo thun", price: 150000 });

console.log(cart.size);
console.log(cart.get(101));
console.log(cart.get(102));

const getTotalPrice = function () {
    let total = 0;
    for (const item of cart.values()) {
        total += item.price * item.quantity;
    }
    return total;
};

console.log(getTotalPrice());

const applyVoucher = function (voucher) {
    const totalPrice = getTotalPrice();
    const code = prompt("Nhập mã giảm giá của bạn: ");
    if (voucher.has(code)) {
        const discountPercent = voucher.get(code);
        return totalPrice * (1 - discountPercent / 100);
    } else if (code) {
        console.log("Mã giảm giá này không hợp lệ!");
    }
    return totalPrice;
};

console.log(applyVoucher(voucherMap));
