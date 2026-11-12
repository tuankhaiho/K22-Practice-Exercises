import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

export default function App() {
    return (
        <BrowserRouter>
            <CartProvider>
                <div className="min-h-screen bg-slate-50 flex flex-col">
                    <Header />
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<Navigate to="/products" />} />
                            <Route path="/products" element={<ProductList />} />
                            <Route path="/products/:id" element={<ProductDetail />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="*" element={<Navigate to="/products" />} />
                        </Routes>
                    </main>
                </div>
            </CartProvider>
        </BrowserRouter>
    );
}
