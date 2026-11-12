import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
    const { totalQuantity } = useCart();
    const navLinkClass = ({ isActive }) =>
        `text-sm sm:text-base font-medium transition-colors duration-200 ${
            isActive ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
        }`;
    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 sm:py-3">
                <div className="flex justify-between items-center sticky top-0 z-50">
                    <NavLink
                        to="/"
                        className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
                    >
                        F8 Store
                    </NavLink>
                    <nav className="flex items-center gap-4 sm:gap-8">
                        <NavLink to="/products" className={navLinkClass}>
                            Sản phẩm
                        </NavLink>

                        <NavLink
                            to="/cart"
                            className={({ isActive }) =>
                                `relative flex items-center gap-2 px-3 py-2 sm:px-4 rounded-full text-sm sm:text-base font-medium transition-all duration-200 ${
                                    isActive
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`
                            }
                        >
                            <span>🛒 Giỏ hàng</span>

                            <span
                                className={`flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full ${
                                    totalQuantity > 0
                                        ? "bg-red-500 text-white"
                                        : "bg-gray-300 text-gray-600"
                                }`}
                            >
                                {totalQuantity}
                            </span>
                        </NavLink>
                    </nav>
                </div>
            </div>
        </header>
    );
}
