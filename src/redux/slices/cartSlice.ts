import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        loadCart: (state) => {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                state.items = JSON.parse(savedCart);
            }
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, loadCart } = cartSlice.actions;

export default cartSlice.reducer;