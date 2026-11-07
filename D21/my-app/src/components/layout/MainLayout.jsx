import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased text-slate-800">
            <Header />
            <main className="flex-1 w-full">
                <Outlet />
            </main>
        </div>
    );
}
