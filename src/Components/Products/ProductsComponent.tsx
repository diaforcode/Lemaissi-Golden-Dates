import Image from "next/image";
import { Suspense } from "react";
import ProductList from "@/Components/Products/ProductsList";
import { getProductsPagination } from "@/server/db/products";
import { getCurrentLocale } from "@/Lib/getCurrentLocale";
import getTrans from "@/Lib/translation";

const ProductsComponent = async () => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);

  const pageSize = 6;

  const products = await getProductsPagination({ pageSize });

  return (
    <div className="relative">
      <div className="my-12 px-2 md:px-4 lg:px-8 xl:px-8 2xl:px-32">
        <div className="flex flex-col justify-center items-center">
          <span className="text-secondary font-sans text-3xl uppercase font-normal">
            {translations.home.bestProducts.Discover}
          </span>
          <div className="flex items-center justify-center p-1">
            <h1 className="font-sans text-xl md:text-3xl uppercase font-bold">
              {translations.home.bestProducts.OurProducts}
            </h1>
            <Image
              alt=""
              src="https://res.cloudinary.com/dfe8kuxsd/image/upload/v1747412954/iapdxgw48jvomlmbjlqa.png"
              width={70}
              height={70}
              className="h-10 w-10 md:h-auto md:w-auto "
            />
          </div>
        </div>
        <Suspense fallback="lading...">
          <div className="flex justify-center items-center">
            <ProductList products={products} />
          </div>
        </Suspense>
      </div>
      {/* <Image
        alt=""
        src={"/assets/images/dattes/palm-tree-leaves-outdoors-sun.png"}
        width={500}
        height={500}
        className="absolute bottom-0 right-0 -z-10 w-auto h-auto"
      /> */}
    </div>
  );
};

export default ProductsComponent;
