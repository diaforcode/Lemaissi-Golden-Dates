import { getCurrentLocale } from "@/Lib/getCurrentLocale";
import { db } from "@/Lib/prisma";
import { getCategories } from "@/server/db/categories";
import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const Categories = async () => {
  const categories = await getCategories();
  // console.log(categories);
  const locale = await getCurrentLocale();
  return (
    <div className="px-4 my-4 md:mt-8 py-4">
      <div className="flex flex-col gap-4 md:gap-8 md:flex-row ">
        {categories.map((category: Category) => (
          <div
            key={category.image}
            className="relative bg-white shadow-xl flex flex-col  "
          >
            <Link
              href={`/${locale}/Category/` + category.id}
              className="relative flex h-72 sm:h-auto  overflow-hidden "
            >
              <Image
                src={category.image}
                alt={category.name}
                className="object-cover p-3  sm:h-[500px] sm:w-[500px] "
                width={500}
                height={500}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
