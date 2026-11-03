import ProductCard from "./ProductCard";

function ProductList({ products, onAddToCart }) {
    return (
        <div>
            <div className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>Danh sách sản phẩm</span>
                <span className="text-sm font-normal text-gray-500">
                    ({products.length} sản phẩm)
                </span>
            </div>

            <div className="grid grid-cols-3 gap-5">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductList;
