export default function Badge({ discountPercent, inStock }) {
    if (!inStock) {
        return (
            <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 bg-gray-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white/80"></span>
                Hết hàng
            </span>
        );
    }

    if (discountPercent > 0) {
        return (
            <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                
                -{discountPercent}%
            </span>
        );
    }

    return null;
}
