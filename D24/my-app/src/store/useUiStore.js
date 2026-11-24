import { create } from "zustand";
export const useUiStore = create((set) => ({
    searchText: "",
    filterMode: "all",
    favoriteIds: [],

    setSearchText: (searchText) => set({ searchText }),
    setFilterMode: (filterMode) => set({ filterMode }),

    addFavorite: (id) => {
        set((state) =>
            state.favoriteIds.includes(id)
                ? state
                : { favoriteIds: [...state.favoriteIds, id] },
        );
    },

    removeFavorite: (id) => {
        set((state) => ({
            favoriteIds: state.favoriteIds.filter((x) => x !== id),
        }));
    },
}));
