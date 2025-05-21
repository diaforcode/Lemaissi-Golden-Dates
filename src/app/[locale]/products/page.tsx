"use server";
import ProductList from "@/Components/Products/ProductsList";
import { getCurrentLocale } from "@/Lib/getCurrentLocale";
import getTrans from "@/Lib/translation";
import { getProductsPagination, getProductsCount } from "@/server/db/products";
import { Suspense } from "react";

// const ProductsPage = async ({
//   searchParams,
// }: {
//   searchParams?: { page?: string };
// }) => {
const ProductsPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) => {
  const searchParamsPage = await searchParams;
  const currentPage = parseInt(searchParamsPage?.page || "1", 10);
  const pageSize = 6;

  const [products, total] = await Promise.all([
    getProductsPagination({ page: currentPage, pageSize }),
    getProductsCount(),
  ]);
  const totalPages = Math.ceil(total / pageSize);

  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);

  return (
    <div className="mt-24 pb-24 px-2 md:px-4 lg:px-8 xl:px-8 2xl:px-32">
      {products.length > 0 ? (
        <>
          <h1 className="text-2xl uppercase">
            {translations.home.bestProducts.OurProducts}
          </h1>
          <Suspense fallback="loading...">
            <ProductList
              products={products}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          </Suspense>
        </>
      ) : (
        <p className="justify-center items-center py-10">
          {translations.products.noProductsFound}
        </p>
      )}
    </div>
  );
};

export default ProductsPage;
