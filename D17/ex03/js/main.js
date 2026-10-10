const API_URL = "https://dummyjson.com/products";

const productList = document.querySelector("#product-list");
const modal = document.querySelector("#detail-modal");
const modalContent = document.querySelector("#modal-content");
const closeModalBtn = document.querySelector("#close-modal");

let isLoading = false;
let detailLoading = false;

const getImage = function (product) {
    return product.thumbnail || (product.images && product.images[0]) || "";
};

const renderLoading = function () {
    productList.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center py-20 gap-3">
            <div class="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p class="text-slate-500 text-sm">Đang tải sản phẩm...</p>
        </div>
    `;
};

const renderError = function (message) {
    productList.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center py-20 gap-4">
            <p class="text-red-600 font-medium text-center">${message}</p>
            <button
                id="retry-btn"
                class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition"
            >
                Thử lại
            </button>
        </div>
    `;

    document
        .querySelector("#retry-btn")
        .addEventListener("click", loadProducts);
};

const renderEmpty = function () {
    productList.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center py-20 gap-3">
            <p class="text-slate-500 text-sm">Không có sản phẩm nào để hiển thị.</p>
        </div>
    `;
};

const renderProducts = function (items) {
    if (!Array.isArray(items) || items.length === 0) {
        renderEmpty();
        return;
    }
    productList.innerHTML = items
        .map(
            (p) => `
        <article
            class="product-card bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col"
            data-id="${p.id}"
        >
            <div class="relative">
                <img
                    class="w-full h-44 object-cover bg-slate-100"
                    src="${getImage(p)}"
                    alt="${p.title}"
                    loading="lazy"
                />
                <span class="absolute top-2 left-2 bg-white/90 backdrop-blur text-xs px-2 py-1 rounded-full font-medium text-slate-700">
                    #${p.id}
                </span>
                <span class="absolute top-2 right-2 bg-slate-50 text-xs px-2 py-1 rounded-full font-semibold text-amber-900">
                    <i class="fa-solid fa-star text-yellow-300"></i> ${p.rating}
                </span>
            </div>

            <div class="p-4 flex flex-col flex-grow gap-2">
                <span class="self-start text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded capitalize">
                    ${p.category}
                </span>
                <h3 class="text-sm font-semibold text-slate-900 leading-tight line-clamp-2" title="${p.title}">
                    ${p.title}
                </h3>

                <!-- Price + Stock -->
                <div class="flex items-end justify-between mt-auto pt-2">
                    <div>
                        <p class="text-xs text-slate-400">Giá</p>
                        <p class="text-lg font-bold text-emerald-600">
                            $${p.price.toLocaleString()}
                        </p>
                    </div>
                    <div class="text-right">
                        <p class="text-xs text-slate-400">Tồn kho</p>
                        <p class="text-sm font-medium text-slate-700">
                            ${p.stock} sp
                        </p>
                    </div>
                </div>
            </div>
        </article>
    `,
        )
        .join("");

    document.querySelectorAll(".product-card").forEach((card) => {
        card.addEventListener("click", () => {
            const id = Number(card.dataset.id);
            openProductDetail(id);
        });
    });
};

async function loadProducts() {
    renderLoading();
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

function renderDetailLoading() {
    modalContent.innerHTML = `
        <div class="flex flex-col items-center justify-center py-20 gap-3">
            <div class="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p class="text-slate-500 text-sm">Đang tải chi tiết...</p>
        </div>
    `;
}

const renderDetailError = function (productId, message) {
    modalContent.innerHTML = `
        <div class="flex flex-col items-center justify-center py-20 gap-4 px-6">
            <p class="text-red-600 font-medium text-center">${message}</p>
            <button
                id="detail-retry-btn"
                class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition"
            >
                Thử lại
            </button>
        </div>
    `;

    document
        .querySelector("#detail-retry-btn")
        .addEventListener("click", () => openProductDetail(productId));
};

const renderDetail = function (product) {
    const mainImage = getImage(product);
    modalContent.innerHTML = `
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <img
                                id="modal-main-image"
                                class="w-full h-72 object-cover rounded-xl bg-slate-100"
                                src="${mainImage}"
                                alt="${product.title}"
                            />
                        </div>
                        <div class="flex flex-col gap-3">
                            <div>
                                <span
                                    class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded capitalize"
                                >
                                    ${product.category}
                                </span>
                                <span class="text-xs text-slate-400 ml-2"
                                    >Mã: #${product.id}</span
                                >
                            </div>

                            <h2 class="text-xl font-bold text-slate-900 leading-tight">
                                ${product.title}
                            </h2>

                            <div class="flex items-center gap-3">
                                <span class="text-2xl font-bold text-emerald-600">
                                    $${product.price.toLocaleString()}
                                </span>
                            </div>

                            <p class="text-sm text-slate-600 leading-relaxed">
                                ${product.description || "Chưa có mô tả."}
                            </p>

                            <div class="grid grid-cols-2 gap-3 mt-2 text-sm">
                                <div class="bg-slate-50 rounded-lg p-3">
                                    <p class="text-xs text-slate-400">Tồn kho</p>
                                    <p class="font-semibold text-slate-800">
                                        ${product.stock} sản phẩm
                                    </p>
                                </div>
                                <div class="bg-slate-50 rounded-lg p-3">
                                    <p class="text-xs text-slate-400">Thương hiệu</p>
                                    <p class="font-semibold text-slate-800">
                                        ${product.brand || "—"}
                                    </p>
                                </div>
                                <div class="bg-slate-50 rounded-lg p-3">
                                    <p class="text-xs text-slate-400">Giảm giá</p>
                                    <p class="font-semibold text-slate-800">
                                        ${
                                            product.discountPercentage
                                                ? product.discountPercentage +
                                                  "%"
                                                : "—"
                                        }
                                    </p>
                                </div>
                                <div class="bg-slate-50 rounded-lg p-3">
                                    <p class="text-xs text-slate-400">Đánh giá</p>
                                    <p class="font-semibold text-slate-800">
                                        <i class="fa-solid fa-star text-yellow-300"></i>
                                        ${product.rating}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    `;
};

async function openProductDetail(productId) {
    if (detailLoading) return;
    detailLoading = true;

    modal.classList.replace("hidden", "flex");
    document.body.style.overflow = "hidden";
    renderDetailLoading();

    try {
        const response = await fetch(`${API_URL}/${productId}`);
        if (!response.ok)
            throw new Error(`Không thể tải chi tiết (lỗi ${response.status}).`);

        renderDetail(await response.json());
    } catch (error) {
        const message =
            error instanceof TypeError
                ? "Mất kết nối mạng. Vui lòng thử lại."
                : error.message;
        renderDetailError(productId, message);
    } finally {
        detailLoading = false;
    }
}

const closeModal = function () {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
    modalContent.innerHTML = "";
};

closeModalBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

document.addEventListener("DOMContentLoaded", loadProducts);
