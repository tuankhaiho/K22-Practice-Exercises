import { useUiStore } from "../store/useUiStore";
import { formatUSD } from "../api/products";

export default function ProductCard({ product }) {
    const { id, title, price, thumbnail } = product;
    const isFavorite = useUiStore((s) => s.favoriteIds.includes(id));
    const addFavorite = useUiStore((s) => s.addFavorite);
    const removeFavorite = useUiStore((s) => s.removeFavorite);

    return (
        <li className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
            <div className="aspect-square bg-slate-100">
                <img
                    src={thumbnail}
                    alt={title}
                    loading="lazy"
                    className="h-full w-full object-contain"
                />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="line-clamp-2 font-semibold">{title}</h3>
                <p className="text-lg font-bold text-indigo-600">
                    {formatUSD(price)}
                </p>
                <button
                    type="button"
                    aria-pressed={isFavorite}
                    onClick={() =>
                        isFavorite ? removeFavorite(id) : addFavorite(id)
                    }
                    className={`mt-auto flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                        isFavorite
                            ? "bg-rose-500 text-white hover:bg-rose-600"
                            : "border border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                >
                    <i
                        className={
                            isFavorite
                                ? "fa-solid fa-heart"
                                : "fa-regular fa-heart"
                        }
                    ></i>
                    <span>{isFavorite ? "Bỏ yêu thích" : "Yêu thích"}</span>
                </button>
            </div>
        </li>
    );
}
