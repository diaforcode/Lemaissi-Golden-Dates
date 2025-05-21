import { CartItem } from "@/redux/features/cart/cartSlice";

// export const deliveryFee = 5;

export const getCartQuantity = (cart: CartItem[]) => {
  return cart.reduce((quantity, item) => item.quantity! + quantity, 0);
};

export const getItemQuantity = (id: string, cart: CartItem[]) => {
  return cart.find((item) => item.id === id)?.quantity || 0;
};

export const getSubTotal = (cart: CartItem[]) => {
  return cart.reduce((total, cartItem) => {
    // item.basePrice + item.size.price + extra prices
    // console.log("total = ", total);
    const totalpro = (cartItem.quantity || 0) * (cartItem.price || 0);

    return total + totalpro;
  }, 0);
};

// export const getTotalAmount = (cart: CartItem[]) => {
//   return getSubTotal(cart) + deliveryFee;
// };
