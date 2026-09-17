const products = [
    { id: 1, name: "iPhone 15", price: 22000000, category: "Điện thoại" },
    {
        id: 2,
        name: "Samsung Galaxy S24",
        price: 20000000,
        category: "Điện thoại",
    },
    { id: 3, name: "MacBook Air M2", price: 26000000, category: "Laptop" },
    { id: 4, name: "Dell XPS 13", price: 30000000, category: "Laptop" },
    { id: 5, name: "AirPods Pro", price: 6000000, category: "Phụ kiện" },
    { id: 6, name: "Apple Watch", price: 9000000, category: "Phụ kiện" },
];

function getFilteredProducts(productList, category) {
    const searchCategory = category.toLowerCase();
    if (searchCategory === "tất cả" || searchCategory === "") {
        return productList;
    }

    let result = productList.filter(
        (product) => product.category.toLowerCase() === searchCategory,
    );

    if (result.length === 0) {
        console.log("Không tìm thấy sản phẩm phù hợp.");
    }
    return result;
}

// const filteredProductsTest = getFilteredProducts(products, "");
// console.log(filteredProductsTest);

const getSortedProducts = function (productList, sortType) {
    const sortList = [...productList];
    if (sortType === "asc") {
        return sortList.sort((a, b) => a.price - b.price);
    }
    if (sortType === "desc") {
        return sortList.sort((a, b) => b.price - a.price);
    }

    return sortList;
};

// const sortedProducts = getSortedProducts(products, "desc");
// console.log(sortedProducts);

const getProductDescriptions = function (productList) {
    return productList.map(
        (products) =>
            `${products.name} - ${products.category} - ${products.price}`,
    );
};

// const productDescriptions = getProductDescriptions(products);
// console.log(productDescriptions);

const calculateTotal = function (productList) {
    return productList.reduce((total, product) => total + product.price, 0);
};

// const filteredProducts = getFilteredProducts(products, "Điện thoại");
// const total = calculateTotal(filteredProducts);
// console.log(total);

const filteredProducts = getFilteredProducts(products, "Điện thoại");

const sortedProducts = getSortedProducts(filteredProducts, "asc");

const productDescriptions = getProductDescriptions(sortedProducts);
console.log(productDescriptions);

const total = calculateTotal(sortedProducts);
console.log(total);
