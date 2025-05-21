"use client";
import { addCartItem, selectCartItems } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import React, { useEffect } from "react";
import { ProductWithRelations } from "../../types/product";
import { Translations } from "@/types/translations";
import { useParams } from "next/navigation";
import { ShoppingCart } from "lucide-react";

const AddToCartButton = ({
  item,
  translations,
}: {
  item: ProductWithRelations;
  translations: Translations;
}) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCartItems);
  const { locale } = useParams();
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);
  const handleAddToCart = () => {
    dispatch(
      addCartItem({
        id: item.id,
        images: item.images,
        name: item.name,
        description: item.description,
        price: item.price,
      })
    );
  };
  return (
    <button
      type="submit"
      onClick={handleAddToCart}
      className="flex items-center justify-center w-full rounded-md bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-tertiary "
    >
      {locale === "ar" && translations.products.addToCart}

      <ShoppingCart width={20} height={20} className="mr-2 " />
      {locale != "ar" && translations.products.addToCart}
    </button>
  );
};

export default AddToCartButton;
