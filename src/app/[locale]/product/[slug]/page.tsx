// import Reviews from "@/components/Reviews";

import Add from "@/Components/Product/Add";
import ProductImages from "@/Components/Product/Product";
import ProductList from "@/Components/Products/ProductsList";
import { formatCurrency } from "@/Lib/formatters";
import { getCurrentLocale } from "@/Lib/getCurrentLocale";
import getTrans from "@/Lib/translation";

import { getProducts, getProductsPagination } from "@/server/db/products";
import { Suspense } from "react";

const SinglePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  // const SinglePage = async ({ params }: any) => {
  const products = await getProducts();

  const pageSize = 3;

  const getProductsPag = await getProductsPagination({ pageSize });

  // const Params = await params;
  // const { slug } = Params;
  const { slug } = await params;
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);

  const currentProduct = products.find((item) => {
    if (item.id === slug) {
      return item;
    }
  });
  console.log("PackagingDetail", currentProduct?.packagingDetails);
  return (
    <>
      <div className="px-4 py-10 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
        {/* IMG */}
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
          <ProductImages items={currentProduct} />
        </div>
        {/* TEXTS */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-4xl font-medium"></h1>
          <p className="text-gray-500">
            {locale === "ar"
              ? currentProduct?.nameArabic
              : currentProduct?.name}
          </p>
          {/* <div className="h-[2px] bg-gray-100" />

          <div className="flex items-center gap-4">
            <h2 className="font-medium text-2xl">
              {formatCurrency(currentProduct?.price || 0)}
            </h2>
          </div> */}

          <div className="h-[2px] bg-gray-100" />

          {/* <CustomizeProducts /> */}
          <Add slug={slug} item={currentProduct} translations={translations} />

          {/* <div className="h-[2px] bg-gray-100" /> */}

          <div className="text-sm">
            <h4 className="font-medium mb-4">
              {translations.products.productInfo}
            </h4>
            <p>
              {locale === "ar"
                ? currentProduct?.descriptionArabic
                : currentProduct?.description}
            </p>
          </div>
          <div className="">
            <ul className="flex mb-4" role="tablist">
              <li className="mr-4">
                <a
                  className="text-primary font-semibold py-2 px-4 border-b-2 border-secondary"
                  data-toggle="tab"
                  href="#description"
                  role="tab"
                  aria-controls="description"
                  aria-selected="true"
                >
                  Packaging details
                </a>
              </li>
            </ul>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 font-medium text-gray-700">
                      Existe en
                    </th>
                    <th className="px-4 py-2 font-medium text-gray-700">
                      Nombre de boites par carton
                    </th>
                    <th className="px-4 py-2 font-medium text-gray-700">
                      Nombre de cartons par palette
                    </th>
                    <th className="px-4 py-2 font-medium text-gray-700">
                      Poids net par conteneur 40'
                    </th>
                    <th className="px-4 py-2 font-medium text-gray-700">
                      Poids net par conteneur 20'
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentProduct?.packagingDetails.map((detail) => (
                    <tr className="hover:bg-gray-50" key={detail.id}>
                      <td className="px-4 py-2">{detail.packageSize}</td>
                      <td className="px-4 py-2">{detail.boxesPerCarton}</td>
                      <td className="px-4 py-2">{detail.cartonsPerPallet}</td>
                      <td className="px-4 py-2">
                        {detail.netWeightPer40ftContainer}
                      </td>
                      <td className="px-4 py-2">
                        {detail.netWeightPer20ftContainer}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-24 pb-24 px-2 md:px-4 lg:px-8 xl:px-8 2xl:px-32">
        <h1 className="text-2xl">
          {translations.home.bestProducts.OurProducts}
        </h1>
        <Suspense fallback="lading...">
          <ProductList products={getProductsPag} />
          {/* <ProductList  /> */}
        </Suspense>
      </div>
    </>
  );
};

export default SinglePage;
