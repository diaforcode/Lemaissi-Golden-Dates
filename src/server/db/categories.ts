import { cache } from "@/Lib/cache";
import { db } from "@/Lib/prisma";

// export const getCategories = cache(
//   () => {
//     const categories = db.category.findMany({
//       orderBy: {
//         order: "asc",
//       },
//     });
//     return categories;
//   },
//   ["categories"],
//   { revalidate: 3600 }
// );
export const getCategories = cache(
  () => {
    const Category = db.category.findMany({
      include: {
        products: true,
      },
    });
    return Category;
  },
  ["categories"],
  { revalidate: 3600 }
);

export const getcategory = cache(
  (id: string) => {
    const category = db.category.findUnique({
      where: {
        id,
      },
    });
    return category;
  },
  ["category"],
  { revalidate: 3600 }
);
