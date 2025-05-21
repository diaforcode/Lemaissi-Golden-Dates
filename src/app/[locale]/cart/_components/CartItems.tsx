"use client";

import { getSubTotal } from "@/Lib/cart";
import { formatCurrency } from "@/Lib/formatters";
import {
  addCartItem,
  CartItem,
  clearCart,
  removeCartItem,
  removeItemFromCart,
  selectCartItems,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

function CartItems() {
  const cart = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
  const subTotal = getSubTotal(cart);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      {cart && cart.length > 0 ? (
        <div className="h-full bg-gray-100 py-20">
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {cart.map((item) => (
                <div
                  className=" justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                  key={item.id}
                >
                  {item?.images && (
                    <div className="">
                      <Image
                        src={item?.images[0]?.image}
                        className="object-cover w-full h-[400px]  sm:h-32 sm:w-52 rounded-lg"
                        alt={item.name}
                        width={500}
                        height={500}
                      />
                    </div>
                  )}
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700">{item.price}</p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <button
                          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-primary hover:text-blue-50"
                          onClick={() =>
                            dispatch(
                              removeCartItem({
                                id: item.id,
                              })
                            )
                          }
                        >
                          {" "}
                          -{" "}
                        </button>
                        <span className="h-8 w-8 border bg-white  text-xs outline-none flex justify-center items-center">
                          {item.quantity}
                        </span>
                        <button
                          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-primary hover:text-blue-50"
                          onClick={() =>
                            dispatch(
                              addCartItem({
                                id: item.id,
                                images: item.images,
                                name: item.name,
                                description: item.description,
                                price: item.price,
                              })
                            )
                          }
                        >
                          {" "}
                          +{" "}
                        </button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">
                          {(item.price || 0) * (item.quantity || 1)}
                        </p>
                        <button
                          className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          onClick={() =>
                            dispatch(removeItemFromCart({ id: item.id }))
                          }
                        >
                          x
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="relative flex justify-end items-center ">
                <button
                  className="flex items-center gap-1 p-3"
                  onClick={() => dispatch(clearCart())}
                >
                  <div className="relative">
                    <div className="flex items-center  hover:opacity-0">
                      <Trash2 width={20} height={20} />
                      <span className="font-semibold">Clear Cart Items</span>
                    </div>
                    <div className="absolute flex items-center top-0 bottom-0 left-0 right-0 opacity-0 hover:opacity-100 hover:text-red-600">
                      <Trash2 width={20} height={20} />
                      <span className="font-semibold">Clear Cart Items</span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            {/* Sub total */}
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">{formatCurrency(subTotal)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">$4.99</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">
                    {formatCurrency(subTotal + 4.99)}
                  </p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md bg-primary py-1.5 font-medium text-blue-50 hover:bg-secondary">
                Check out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="flex flex-col justify-center items-center text-stone-300 py-10">
          There are no items in your cart. Add some
        </p>
      )}
    </div>
  );
}

export default CartItems;
