import { useState } from "react";
import { initialProducts } from "./data/products";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
    const [products] = useState(initialProducts);
    const [cartItems, setCartItems] = useState([]);

    const handleAddToCart = (productId) => {
        const product = products.find((p) => p.id === productId);
        if (!product) return;

        setCartItems((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === productId);

            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };
    const handleIncreaseQuantity = (productId) => {
        setCartItems((prevCart) =>
            prevCart.map((item) =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
            ),
        );
    };  
    const handleDecreaseQuantity = (productId) => {
        setCartItems((prevCart) =>
            prevCart.map((item) =>
                item.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item,
            ),
        );
    };

    const handleRemoveItem = (productId) => {
        setCartItems((prevCart) =>
            prevCart.filter((item) => item.id !== productId),
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <section className="lg:col-span-7 xl:col-span-8">
                        <ProductList
                            products={products}
                            onAddToCart={handleAddToCart}
                        />
                    </section>
                    <aside className="lg:col-span-5 xl:col-span-4 sticky top-20">
                        <Cart
                            cartItems={cartItems}
                            onIncreaseQuantity={handleIncreaseQuantity}
                            onDecreaseQuantity={handleDecreaseQuantity}
                            onRemoveItem={handleRemoveItem}
                        />
                    </aside>
                </div>
            </main>
        </div>
    );
}

export default App;
