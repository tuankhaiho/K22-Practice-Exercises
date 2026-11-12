import { createContext, useContext, useReducer } from "react";
import { cartReducer, initialCartState, ACTIONS } from "../reducer/cartReducer";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, initialCartState);

    const addToCart = (product) =>
        dispatch({ type: ACTIONS.ADD, payload: product });
    const increase = (id) => dispatch({ type: ACTIONS.INCREASE, payload: id });
    const decrease = (id) => dispatch({ type: ACTIONS.DECREASE, payload: id });
    const remove = (id) => dispatch({ type: ACTIONS.REMOVE, payload: id });

    const totalQuantity = cart.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increase,
                decrease,
                remove,
                totalQuantity,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart phải nằm trong CartProvider");
    return ctx;
}
