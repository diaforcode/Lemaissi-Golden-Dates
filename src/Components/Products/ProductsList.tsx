import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../menu/add-to-cart-button";
import { formatCurrency } from "@/Lib/formatters";
import { ProductWithRelations } from "../../types/product";
import { getCurrentLocale } from "@/Lib/getCurrentLocale";
import getTrans from "@/Lib/translation";
// import { getProductsCount, getProductsPagination } from "@/server/db/products";

const ProductList = async ({
  currentPage,
  products,
  totalPages,
}: {
  currentPage?: number;
  products: ProductWithRelations[];
  totalPages?: number;
}) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);

  // const [products, total] = await Promise.all([
  //   getProductsPagination({ page: currentPage, pageSize: limit }),
  //   getProductsCount(),
  // ]);
  // const totalPages = Math.ceil(total / limit);

  return (
    <div className="px-4 my-4 md:mt-8 py-4">
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:flex-row ">
        {products &&
          products.length > 0 &&
          products.map((product: ProductWithRelations) => (
            <div
              className="relative bg-white shadow-xl flex flex-col"
              key={product.id}
            >
              <Link
                href={`/${locale}/product/` + product.id}
                className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
              >
                <Image
                  src={product?.images[0]?.image}
                  alt={product.name}
                  className="object-cover p-3 hover:p-0 "
                  width={500}
                  height={500}
                />
              </Link>
              <div className="mt-4 px-5 pb-5">
                <h5 className="text-lg md:text-xl tracking-tight text-slate-900">
                  {locale === "ar" ? product.nameArabic : product.name}
                </h5>
                <div className="mt-2 mb-5 flex items-center justify-between">
                  <p>
                    <span className="text-xl md:text-3xl font-bold text-slate-900">
                      {formatCurrency(product.price)}
                    </span>
                    {/* <span className="text-sm text-slate-900 line-through">
                    $699
                  </span> */}
                  </p>
                </div>
                <AddToCartButton item={product} translations={translations} />
              </div>
            </div>
          ))}
      </div>
      {currentPage && totalPages && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <a
            href={`?page=1`}
            className={`px-3 py-1 bg-gray-200 rounded ${
              currentPage === 1 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            First
          </a>
          <a
            href={`?page=${Math.max(currentPage - 1, 1)}`}
            className={`px-3 py-1 bg-gray-200 rounded ${
              currentPage === 1 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            Prev
          </a>
          <span className="font-semibold">
            {currentPage} / {totalPages}
          </span>
          <a
            href={`?page=${Math.min(currentPage + 1, totalPages)}`}
            className={`px-3 py-1 bg-gray-200 rounded ${
              currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            Next
          </a>
          <a
            href={`?page=${totalPages}`}
            className={`px-3 py-1 bg-gray-200 rounded ${
              currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            Last
          </a>
        </div>
      )}
    </div>
  );
};

export default ProductList;
