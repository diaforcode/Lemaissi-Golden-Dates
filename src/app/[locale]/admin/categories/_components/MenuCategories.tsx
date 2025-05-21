import Link from "@/Components/link";
import { Pages, Routes } from "@/constants/enums";
import { formatCurrency } from "@/Lib/formatters";
import { getCurrentLocale } from "@/Lib/getCurrentLocale";
import getTrans from "@/Lib/translation";
import { ProductWithRelations } from "@/types/product";

import { Category } from "@prisma/client";
import Image from "next/image";

async function MenuCategories({ categories }: { categories: Category[] }) {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  return categories && categories.length > 0 ? (
    <ul className="grid grid-cols-3 gap-4 sm:max-w-[625px] mx-auto">
      {categories.map((Category: Category) => (
        <li
          key={Category.id}
          className="bg-gray-100 hover:bg-gray-200 duration-200 transition-colors rounded-md"
        >
          <Link
            href={`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}/${Category.id}/${Pages.EDIT}`}
            className="element-center flex-col py-4"
          >
            <Image
              src={Category.image}
              alt={Category.name}
              width={100}
              height={100}
              className="object-cover w-full h-[400px]  sm:h-32 sm:w-52 rounded-sm"
            />
            <h3 className="text-lg text-accent font-medium">
              {locale === "ar" ? Category.nameArabic : Category.name}
            </h3>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-accent text-center">{translations.noCategoriesFound}</p>
  );
}

export default MenuCategories;
