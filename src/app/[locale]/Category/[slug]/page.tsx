import ProductList from "@/Components/Products/ProductsList";
import { getCurrentLocale } from "@/Lib/getCurrentLocale";
import getTrans from "@/Lib/translation";
import { getCategories } from "@/server/db/categories";
import { getProductsCount, getProductsPagination } from "@/server/db/products";
import { Suspense } from "react";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ page?: string }>;
};

const SinglePage = async ({ params, searchParams }: PageProps) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);

  const Params = await params;
  const { slug } = Params;

  const categories = await getCategories();
  const searchParamsPage = await searchParams;
  const currentPage = parseInt(searchParamsPage?.page || "1", 10);
  const pageSize = 6;

  const [products, total] = await Promise.all([
    getProductsPagination({ page: currentPage, pageSize }),
    getProductsCount(),
  ]);

  // const currentProducts = products.filter((item) => {
  //   if (item.categoryId === slug) {
  //     return item;
  //   } else {
  //     return null;
  //   }
  // });
  const currentProducts = products.filter((item) => item.categoryId === slug);

  const totalPages = Math.ceil(currentProducts.length / pageSize);

  const catgory = categories.find((item) => {
    if (item.id === slug) {
      return item;
    } else {
      return null;
    }
  });

  return (
    <div className="mt-24 pb-24 px-2 md:px-4 lg:px-8 xl:px-8 2xl:px-32">
      {currentProducts.length > 0 ? (
        <>
          <h1 className="text-2xl uppercase"> {catgory?.name}</h1>
          <Suspense fallback="lading...">
            {/* <ProductList limit={4} Products={products} /> */}
            {currentProducts.length > 0 && (
              <ProductList
                products={currentProducts}
                totalPages={totalPages}
                currentPage={currentPage}
              />
            )}
          </Suspense>
        </>
      ) : (
        <p className="justify-center items-center  py-10">
          There are no products in this category
        </p>
      )}
    </div>
  );
};

export default SinglePage;
