const API_URL = "https://dummyjson.com/products";
const STORAGE_KEY = "cart_data";

let products = [];
let cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

async function loadProducts() {
    const productContainer = document.querySelector("#product-list");
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Không thể kết nối đến máy chủ");
        }
        const data = await response.json();
        products = data.products;
        renderProducts(products);
    } catch (error) {
        productContainer.innerHTML = `<p class="text-red-500 col-span-full">Lỗi tải sản phẩm: ${error.message}</p>`;
    }
}

const renderProducts = function (items) {
    const container = document.querySelector("#product-list");
    container.innerHTML = items
        .map(
            (p) => `
            <div
                class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
            >
                <img
                    class="w-full h-44 object-cover bg-slate-100"
                    src="${p.thumbnail}"
                    alt="${p.title}"
                    loading="lazy"
                />
                <div class="p-4 flex flex-col flex-grow gap-1.5">
                    <div class="text-xs text-slate-500 flex justify-between">
                        <span>Mã: #${p.id}</span>
                        <span
                            ><i class="fa-solid fa-star text-yellow-300"></i>
                            ${p.rating}</span
                        >
                    </div>
                    <div
                        class="text-sm font-semibold text-slate-900 truncate"
                        title="${p.title}"
                    >
                        ${p.title}
                    </div>
                    <div class="text-xs text-slate-500 flex justify-between">
                        <span class="bg-slate-100 px-1.5 py-0.5 rounded"
                            >${p.category}</span
                        >
                        <span>Kho: ${p.stock}</span>
                    </div>
                    <div class="text-lg font-bold text-emerald-600 mt-auto">
                        $${p.price.toLocaleString()}
                    </div>
                    <button
                        class="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                        onclick="addToCart(${p.id})"
                    >
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        `,
        )
        .join("");
};

const saveCart = function () {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    renderCart();
};

const addToCart = function (productId) {
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const product = products.find((p) => p.id === productId);
        if (product) {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail || product.images[0],
                quantity: 1,
            });
        }
    }
    saveCart();
};

function changeQuantity(productId, qty) {
    const item = cart.find((i) => i.id === productId);
    if (!item) return;

    const newQty = item.quantity + qty;
    if (newQty >= 1) {
        item.quantity = newQty;
        saveCart();
    }
}

const removeItem = function (productId) {
    cart = cart.filter((i) => i.id !== productId);
    saveCart();
};

function renderCart() {
    const cartContainer = document.getElementById("cart-container");
    const totalQtyElem = document.getElementById("total-qty");
    const totalPriceElem = document.getElementById("total-price");

    if (cart.length === 0) {
        cartContainer.innerHTML =
            '<div class="text-center text-slate-500 py-8 text-sm">Giỏ hàng của bạn đang trống.</div>';
        totalQtyElem.textContent = "0";
        totalPriceElem.textContent = "$0";
        return;
    }

    cartContainer.innerHTML = cart
        .map((item) => {
            const subtotal = item.price * item.quantity;
            const isDecreaseDisabled = item.quantity <= 1;
            return `
                <div
                    class="flex items-center gap-3 py-3 border-b border-dashed border-slate-200 last:border-0"
                >
                    <img
                        class="w-12 h-12 object-cover rounded-md border border-slate-200 bg-slate-50"
                        src="${item.thumbnail}"
                        alt="${item.title}"
                    />
                    <div class="flex-grow min-w-0">
                        <div
                            class="text-sm font-semibold truncate text-slate-800"
                            title="${item.title}"
                        >
                            ${item.title}
                        </div>
                        <div class="text-xs text-slate-500">
                            Đơn giá: $${item.price.toLocaleString()}
                        </div>
                        <div class="text-sm font-semibold text-emerald-600">
                            Thành tiền: $${subtotal.toLocaleString()}
                        </div>

                        <div class="flex items-center gap-2 mt-1.5">
                            <button
                                class="w-6 h-6 rounded flex items-center justify-center border border-slate-300 bg-slate-50 text-slate-600 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                onclick="changeQuantity(${item.id}, -1)"
                            >
                                -
                            </button>
                            <span class="text-sm font-medium min-w-[20px] text-center"
                                >${item.quantity}</span
                            >
                            <button
                                class="w-6 h-6 rounded flex items-center justify-center border border-slate-300 bg-slate-50 text-slate-600 hover:bg-slate-200 transition-colors"
                                onclick="changeQuantity(${item.id}, 1)"
                            >
                                +
                            </button>
                            <button
                                class="text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded ml-auto transition-colors"
                                onclick="removeItem(${item.id})"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>

    `;
        })
        .join("");

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    totalQtyElem.textContent = totalQuantity.toLocaleString();
    totalPriceElem.textContent = `$${totalPrice.toLocaleString()}`;
}

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    loadProducts();
});
