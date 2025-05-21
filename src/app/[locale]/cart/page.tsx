import { Suspense } from "react";
import CartItems from "./_components/CartItems";
import Image from "next/image";
import ProductList from "@/Components/Products/ProductsList";
import { getProductsPagination } from "@/server/db/products";
// import CheckoutForm from "./_components/CheckoutForm";

const cartPage = async () => {
  const pageSize = 3;

  const products = await getProductsPagination({ pageSize });
  return (
    <main>
      <div className="relative">
        <div className="my-12 px-2 md:px-4 lg:px-8 xl:px-8 2xl:px-32">
          <div className="mb-10 flex justify-center items-center gap-2">
            <h1 className="text-primary text-center font-bold text-4xl italic p-1">
              Cart
            </h1>
          </div>
        </div>
        <CartItems />
        <div className="mt-24 pb-24 px-2 md:px-4 lg:px-8 xl:px-8 2xl:px-32">
          <Suspense fallback="lading...">
            <ProductList products={products} />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default cartPage;
