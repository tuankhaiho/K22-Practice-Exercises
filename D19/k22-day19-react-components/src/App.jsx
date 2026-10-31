import React, { useState } from "react";
import UserProfileCard from "./components/UserProfileCard";
import ProductList from "./components/ProductList";
import FAQList from "./components/FAQList";

function App() {
    const [activePage, setActivePage] = useState("ex01");

    const users = [
        {
            id: 1,
            avatar: "https://i.pravatar.cc/150?img=11",
            fullName: "Nguyễn Văn A",
            jobTitle: "Frontend Developer",
            isOnline: true,
            skills: ["React", "JavaScript", "Tailwind CSS", "Vite"],
        },
        {
            id: 2,
            avatar: "https://i.pravatar.cc/150?img=32",
            fullName: "Trần Thị B",
            jobTitle: "Backend Developer",
            isOnline: false,
            skills: ["Node.js", "Express", "MongoDB", "Docker"],
        },
    ];

    const products = [
        {
            id: 1,
            name: "Tai nghe Gaming",
            price: 1200000,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
            inStock: true,
            discountPercent: 10,
        },
        {
            id: 2,
            name: "Chuột không dây Logitech",
            price: 850000,
            image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60",
            inStock: true,
            discountPercent: 0,
        },
        {
            id: 3,
            name: "Bàn phím cơ",
            price: 2100000,
            image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
            inStock: false,
            discountPercent: 15,
        },
    ];

    const faqData = [
        {
            id: 1,
            question: "Props trong React dùng để làm gì?",
            answer: "Props giúp truyền dữ liệu từ component cha xuống component con, giúp tái sử dụng component linh hoạt hơn.",
            category: "React",
            isHot: true,
        },
        {
            id: 2,
            question: "State là gì và khi nào nên sử dụng?",
            answer: "State là dữ liệu nội bộ của component. Khi state thay đổi, component sẽ được render lại. Dùng khi dữ liệu cần thay đổi theo thời gian hoặc tương tác người dùng.",
            category: "React",
            isHot: false,
        },
        {
            id: 3,
            question: "Sự khác biệt giữa useEffect và useLayoutEffect?",
            answer: "useEffect chạy sau khi trình duyệt vẽ xong, còn useLayoutEffect chạy đồng bộ ngay sau khi DOM thay đổi nhưng trước khi trình duyệt vẽ.",
            category: "Hooks",
            isHot: true,
        },
    ];

    const handleSelectFaq = (id) => {
        alert(`Bạn đã chọn xem chi tiết câu hỏi có ID: ${id}`);
    };

    const handleAddToCart = (product, finalPrice) => {
        alert(
            `Đã thêm "${product.name}" vào giỏ\nGiá: ${finalPrice.toLocaleString("vi-VN")}đ`,
        );
    };

    return (
        <div className="min-h-screen bg-slate-100 pb-12">
            <header className="bg-white shadow-sm py-4 mb-8 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto flex justify-center gap-4">
                    <button
                        onClick={() => setActivePage("ex01")}
                        className={`px-6 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer ${
                            activePage === "ex01"
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        Bài 1: UserProfileCard
                    </button>
                    <button
                        onClick={() => setActivePage("ex02")}
                        className={`px-6 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer ${
                            activePage === "ex02"
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        Bài 2: ProductList
                    </button>
                    <button
                        onClick={() => setActivePage("ex03")}
                        className={`px-6 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer ${
                            activePage === "ex03"
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        Bài 3: FAQ / Accordion
                    </button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4">
                {activePage === "ex01" && (
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 text-center mb-8">
                            Danh Sách Người Dùng 
                        </h1>
                        <div className="flex flex-wrap justify-center gap-6">
                            {users.map((user) => (
                                <UserProfileCard
                                    key={user.id}
                                    avatar={user.avatar}
                                    fullName={user.fullName}
                                    jobTitle={user.jobTitle}
                                    isOnline={user.isOnline}
                                    skills={user.skills}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {activePage === "ex02" && (
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 text-center mb-8">
                            Danh Sách Sản Phẩm
                        </h1>
                        <ProductList
                            products={products}
                            onAddToCart={handleAddToCart}
                        />
                    </div>
                )}

                {activePage === "ex03" && (
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 text-center mb-8">
                            Hệ Thống Hỏi Đáp 
                        </h1>
                        <FAQList faqs={faqData} onSelectFaq={handleSelectFaq} />
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
