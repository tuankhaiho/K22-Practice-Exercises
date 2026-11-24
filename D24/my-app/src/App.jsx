import SearchBox from "./components/SearchBox.jsx";
import FilterToggle from "./components/FilterToggle.jsx";
import FavoriteCount from "./components/FavoriteCount.jsx";
import ProductSummary from "./components/ProductSummary.jsx";
import ProductList from "./components/ProductList.jsx";

export default function App() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <div className="mx-auto max-w-6xl px-4 py-8">
                <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Khám phá sản phẩm
                    </h1>
                    <FavoriteCount />
                </header>

                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <SearchBox />
                    <FilterToggle />
                </div>

                <ProductSummary />
                <ProductList />
            </div>
        </div>
    );
}
