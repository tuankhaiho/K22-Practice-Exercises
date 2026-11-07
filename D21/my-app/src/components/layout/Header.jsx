import { NavLink } from "react-router-dom";

export default function Header() {
    const getNavLinkClass = ({ isActive }) =>
        `flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
            isActive
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:text-blue-600 hover:bg-slate-100"
        }`;

    return (
        <header className="bg-white border-b border-slate-200">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-center h-16">
                    <nav className="flex items-center gap-2">
                        <NavLink to="/" end className={getNavLinkClass}>
                            <i className="fa-solid fa-house text-xs"></i>
                            <span>Trang chủ</span>
                        </NavLink>
                        <NavLink to="/products" className={getNavLinkClass}>
                            <i className="fa-solid fa-box text-xs"></i>
                            <span>Sản phẩm</span>
                        </NavLink>
                    </nav>
                </div>
            </div>
        </header>
    );
}
