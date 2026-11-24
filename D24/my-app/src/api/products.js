import { useQuery } from "@tanstack/react-query";

export const PRODUCTS_URL = "https://dummyjson.com/products";
export const productsQueryKey = ["products"];

export async function fetchProducts() {
    const res = await fetch(PRODUCTS_URL);
    if (!res.ok) {
        throw new Error(`Yêu cầu thất bại:  ${res.status}`);
    }
    return res.json();
}

export function useProducts() {
    return useQuery({
        queryKey: productsQueryKey,
        queryFn: fetchProducts,
    });
}

export const formatUSD = (value) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);
