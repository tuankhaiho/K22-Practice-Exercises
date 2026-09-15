const cart = {
    items: [
        {
            id: 1,
            name: "Laptop",
            price: 15000000,
            quantity: 1,
            category: "Electronics",
        },
        {
            id: 2,
            name: "Mouse",
            price: 300000,
            quantity: 2,
            category: "Electronics",
        },
    ],
    _discountRate: 0,
    validCoupons: {
        WELCOME10: 0.1,
        SUMMER20: 0.2,
        VIP30: 0.3,
    },

    get totalQuantity() {
        let total = 0;
        for (let item of this.items) {
            total += item.quantity;
        }
        return total;
    },

    // Tính tổng tiền hàng (chưa áp dụng mã giảm giá)
    get subtotal() {
        let total = 0;
        for (let item of this.items) {
            total += item.price * item.quantity;
        }
        return total;
    },

    // Áp dụng mã giảm giá bằng cách truyền tên coupon
    // Nếu coupon có trong `validCoupons`, gán `_discountRate`. Nếu không, in thông báo lỗi và không gán.
    set applyCoupon(code) {
        let validCouponCodes = Object.keys(this.validCoupons);
        if (validCouponCodes.includes(code)) {
            this._discountRate = this.validCoupons[code];
            console.log(`Áp dụng thành công mã: ${code}`);
        } else {
            console.log("Mã giảm giá không hợp lệ");
        }
    },

    // Tính tổng tiền thực tế phải trả
    get totalPrice() {
        let discountAmout = this.subtotal * this._discountRate;
        return this.subtotal - discountAmout;
    },

    // Thêm nhiều sản phẩm cùng lúc
    // - Nếu item đã tồn tại (dựa vào id): cộng dồn quantity.
    // - Nếu chưa có: kiểm tra xem item truyền vào có mặc định `quantity` chưa, nếu chưa thì gán mặc định bằng 1 rồi mới push.
    addItems(...newItems) {
        for (let newItem of newItems) {
            let existingItem = this.items.find(
                (item) => item.id === newItem.id,
            );

            if (existingItem) {
                let quantityAdd =
                    newItem.quantity !== undefined ? newItem.quantity : 1;
                existingItem.quantity += quantityAdd;
            } else {
                if (newItem.quantity === undefined) {
                    newItem.quantity = 1;
                }
                this.items.push(newItem);
            }
        }
    },

    // Cập nhật số lượng sản phẩm theo id
    // Nếu newQuantity <= 0 thì tự động xoá sản phẩm đó khỏi giỏ.
    updateQuantity(id, newQuantity) {
        if (newQuantity <= 0) {
            this.removeItem(id);
            return;
        }
        let itemUpdate = this.items.find((item) => item.id === id);
        if (itemUpdate) {
            itemUpdate.quantity = newQuantity;
        } else {
            console.log("Không tìm thấy sản phẩm này trong giỏ!");
        }
    },

    // Xoá sản phẩm theo id
    removeItem(id) {
        this.items = this.items.filter((item) => item.id !== id);
    },

    // Lọc danh sách sản phẩm theo danh mục (category)
    getItemsByCategory(category) {
        return this.items.filter((item) => item.category === category);
    },

    // In hoá đơn chi tiết ra console
    printInvoice() {
        console.log("================ HOÁ ĐƠN BÁN HÀNG ================");
        // In danh sách từng dòng: Tên - Đơn giá - Số lượng - Thành tiền
        for (let item of this.items) {
            let itemTotal = item.price * item.quantity;
            let formatPrice = item.price.toLocaleString("vi-VN");
            let formatItemTotal = itemTotal.toLocaleString("vi-VN");

            console.log(
                `${item.name} - ${formatPrice} x ${item.quantity} = ${formatItemTotal} VNĐ`,
            );
        }
        // In Tổng tiền hàng (Subtotal)
        console.log(
            `Tổng tiền hàng: ${this.subtotal.toLocaleString("vi-VN")} VNĐ`,
        );
        // In Giảm giá (% và số tiền giảm)
        let discountAmount = this.subtotal * this._discountRate;
        let discountPercent = this._discountRate * 100;
        // In Tổng thanh toán (Total Price)
        console.log(
            `Giảm giá: ${discountPercent}% (-${discountAmount.toLocaleString("vi-VN")} VNĐ)`,
        );
        console.log(
            `Tổng thanh toán: ${this.totalPrice.toLocaleString("vi-VN")} VNĐ`,
        );
        console.log("==================================================");
    },
};

// console.log(cart.totalQuantity);
// console.log(cart.subtotal);

// cart.applyCoupon = "WELCOME10";
// console.log(cart.totalPrice);

// cart.applyCoupon = "SUMMER20";
// console.log(cart.totalPrice);

// cart.applyCoupon = "INVALID";

// console.log(cart.totalPrice);

// cart.addItems(
//     {
//         id: 3,
//         name: "Keyboard",
//         price: 700000,
//         quantity: 2,
//         category: "Electronics",
//     },
//     { id: 2, name: "Mouse", price: 300000, category: "Electronics" },
// );

// console.log(cart.items);

// cart.updateQuantity(1, 3);
// cart.updateQuantity(2, 0);
// console.log(cart.items);

// cart.removeItem(1);
// console.log(cart.items);

// console.log(cart.getItemsByCategory("Electronics"));

cart.applyCoupon = "WELCOME10";
console.log(cart.totalPrice);
cart.printInvoice();
