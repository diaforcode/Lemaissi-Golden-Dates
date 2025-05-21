"use client";

import { getCartQuantity, getSubTotal } from "@/Lib/cart";
import { formatCurrency } from "@/Lib/formatters";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NavCartIcons = () => {
  const cart = useAppSelector(selectCartItems);
  const cartQuantity = getCartQuantity(cart);
  const subTotal = getSubTotal(cart);
  return (
    <Link
      href="/cart"
      className="flex items-center justify-center gap-1 relative"
    >
      <div className="rounded-full bg-primary text-white text-xs py-1 px-2 flex items-center justify-center">
        {cartQuantity} / {formatCurrency(subTotal) || "$0.00"}
      </div>
      {/* <Image src="/bag.png" alt="" width={22} height={22} /> */}
      <ShoppingBag width={22} height={22} color="#976348" />
    </Link>
  );
};

export default NavCartIcons;
