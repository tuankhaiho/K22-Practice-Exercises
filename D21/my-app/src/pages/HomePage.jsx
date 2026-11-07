import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 mx-auto flex items-center justify-center text-2xl mb-6 shadow-xs">
                <i className="fa-solid fa-shop"></i>
            </div>

            <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
                Chào mừng bạn đến với{" "}
                <span className="text-blue-600">F8 Store</span>
            </div>

            <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed mb-8">
                Cửa hàng chuyên cung cấp các thiết bị công nghệ chính hãng, điện thoại, máy tính và phụ kiện chất lượng cao.
            </p>

            <div>
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-base shadow-md shadow-blue-500/20 hover:shadow-lg transition-all"
                >
                    <i className="fa-solid fa-bag-shopping"></i>
                    <span>Xem sản phẩm</span>
                    <i className="fa-solid fa-arrow-right text-xs ml-1"></i>
                </Link>
            </div>
        </div>
    );
}
