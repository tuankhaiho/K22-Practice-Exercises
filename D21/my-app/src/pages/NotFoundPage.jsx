import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
            <div className="max-w-md w-full text-center">
                <div className="mb-6">
                    <span className="text-8xl font-black text-slate-200 select-none">
                        404
                    </span>
                </div>

                <div className="text-2xl font-extrabold text-slate-800 tracking-tight mb-3">
                    Không tìm thấy trang
                </div>

                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                    Đường dẫn bạn vừa truy cập không tồn tại hoặc đã bị xóa.
                </p>

                <div className="flex items-center justify-center gap-3">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                        <i className="fa-solid fa-house text-xs"></i>
                        <span>Về trang chủ</span>
                    </Link>

                    <Link
                        to="/products"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-sm font-semibold transition-colors"
                    >
                        <i className="fa-solid fa-box text-xs"></i>
                        <span>Xem danh sách sản phẩm</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
