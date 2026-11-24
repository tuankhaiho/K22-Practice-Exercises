import { useUiStore } from "../store/useUiStore";
export default function FavoriteCount() {
    const count = useUiStore((s) => s.favoriteIds.length);
    return (
        <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-700">
            <i className="fa-solid fa-heart"></i> Yêu thích: {count}
        </span>
    );
}
