import { db } from "@/Lib/prisma";
import { getCategories } from "@/server/db/categories";
import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const Categories = async ({
  limit,
  searchParams,
  Products,
}: {
  limit?: number;
  searchParams?: any;
  Products?: any;
}) => {
  const categories = await getCategories();
  // console.log(categories);

  return (
    <div className="px-4 my-4 md:mt-8 py-4">
      <div className="flex flex-col gap-4 md:gap-8 md:flex-row ">
        {categories.map((category: Category) => (
          <div
            key={category.image}
            className="relative bg-white shadow-xl flex flex-col  "
          >
            <Link
              href={"/Category/" + category.id}
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
