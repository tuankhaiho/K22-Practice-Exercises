export const initialCartState = [];
export const ACTIONS = {
    ADD: "ADD",
    INCREASE: "INCREASE",
    DECREASE: "DECREASE",
    REMOVE: "REMOVE",
};

export function cartReducer(state, action) {
    switch (action.type) {
        case ACTIONS.ADD: {
            const product = action.payload;
            const existing = state.find((item) => item.id === product.id);
            if (existing) {
                return state.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                );
            }
            return [...state, { ...product, quantity: 1 }];
        }
        case ACTIONS.INCREASE: {
            return state.map((item) =>
                item.id === action.payload
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
            );
        }
        case ACTIONS.DECREASE: {
            return state.map((item) =>
                item.id === action.payload && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item,
            );
        }
        case ACTIONS.REMOVE: {
            return state.filter((item) => item.id !== action.payload);
        }
        default:
            return state;
    }
}
