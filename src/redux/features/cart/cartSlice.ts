import { RootState } from "@/redux/store";
import { Image } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  name: string;
  id: string;
  images: Image[];
  price: number;
  quantity?: number;
  description: string;
};

type CartState = {
  items: CartItem[];
};
// const initialCartItems = localStorage.getItem("cartItems");

// const initialState: CartState = {
//   items: initialCartItems ? JSON.parse(initialCartItems) : [],
// };

const getInitialCartItems = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

const initialState: CartState = {
  items: getInitialCartItems(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity =
          (existingItem.quantity || 0) + (action.payload.quantity || 1);
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
    },
    removeCartItem: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          item.quantity! -= 1;
        }
      }
    },
    removeItemFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items = state.items.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addCartItem, removeCartItem, removeItemFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
