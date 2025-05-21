"use client";

import { addCartItem, selectCartItems } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Translations } from "@/types/translations";
// import { Product } from "@prisma/client";
import { useState } from "react";

const Add = ({
  slug,
  item,
  productId,
  variantId,
  stockNumber,
  translations,
}: {
  slug?: string;
  item: any;
  productId?: string;
  variantId?: string;
  stockNumber?: number;
  translations: Translations;
}) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < 5) {
      setQuantity((prev) => prev + 1);
    }
  };
  const handleAddToCart = () => {
    dispatch(
      addCartItem({
        id: item.id,
        images: item.images,
        name: item.name,
        description: item.description,
        price: item.price,
        quantity: quantity,
      })
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">{translations.products.ChooseQuantity}</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("d")}
              disabled={quantity === 1}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("i")}
              disabled={quantity === stockNumber}
            >
              +
            </button>
          </div>
          {/* {5 < 1 ? (
            <div className="text-xs">Product is out of stock</div>
          ) : (
            <div className="text-xs">
              Only <span className="text-orange-500">{stockNumber} items</span>{" "}
              left!
              <br /> {"Don't"} miss it
            </div>
          )} */}
        </div>
        <button
          type="submit"
          onClick={handleAddToCart}
          className="w-36 text-sm rounded-3xl ring-1 ring-primary text-primary py-2 px-4 hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none"
        >
          {translations.products.addToCart}
        </button>
      </div>
    </div>
  );
};

export default Add;
