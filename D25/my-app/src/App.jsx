import { useState } from "react";
import ProductFilter from "./components/ProductFilter.jsx";
import RegisterForm from "./components/RegisterForm.jsx";

const TABS = [
    { id: "filter", label: "Bài 1: Bộ lọc sản phẩm" },
    { id: "register", label: "Bài 2: Form đăng ký" },
];

export default function App() {
    const [tab, setTab] = useState("filter");

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <nav className="flex justify-center gap-2 pt-6">
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  tab === id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {tab === "filter" ? <ProductFilter /> : <div className="p-6"><RegisterForm /></div>}
        </div>
    );
}
