import Link from "@/Components/link";
import { Pages, Routes } from "@/constants/enums";
import { formatCurrency } from "@/Lib/formatters";
import { getCurrentLocale } from "@/Lib/getCurrentLocale";
import getTrans from "@/Lib/translation";
import { ProductWithRelations } from "@/types/product";

import { Product } from "@prisma/client";
import Image from "next/image";

async function MenuItems({ products }: { products: ProductWithRelations[] }) {
  // console.log("products", products);
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  return products && products.length > 0 ? (
    <ul className="grid grid-cols-3 gap-4 sm:max-w-[625px] mx-auto">
      {products.map((product: ProductWithRelations) => (
        <li
          key={product.id}
          className="bg-gray-100 hover:bg-gray-200 duration-200 transition-colors rounded-md"
        >
          <Link
            href={`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${product.id}/${Pages.EDIT}`}
            className="element-center flex-col py-4"
          >
            <Image
              src={product?.images[0]?.image}
              alt={product.name}
              width={100}
              height={100}
              className="object-cover w-full h-[400px]  sm:h-32 sm:w-52 rounded-sm"
            />
            <h3 className="text-lg text-accent font-medium">{product.name}</h3>
            <h3 className="text-base text-accent font-medium">
              {formatCurrency(product.price)}
            </h3>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-accent text-center">{translations.noProductsFound}</p>
  );
}

export default MenuItems;
