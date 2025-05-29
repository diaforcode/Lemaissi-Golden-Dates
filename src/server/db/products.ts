import { cache } from "@/Lib/cache";
import { db } from "@/Lib/prisma";

export const getProductsByCategory = cache(
  () => {
    const products = db.category.findMany({
      include: {
        products: {
          include: {
            images: true,
          },
        },
      },
    });
    return products;
  },
  ["products-by-category"],
  { revalidate: 3600 }
);
// export const getBestSellers = cache(
//   (limit?: number | undefined) => {
//     const bestSellers = db.product.findMany({
//       where: {
//         orders: {
//           some: {},
//         },
//       },
//       orderBy: {
//         orders: {
//           _count: "desc",
//         },
//       },
//       include: {
//         images: true,
//       },
//       take: limit,
//     });
//     return bestSellers;
//   },
//   ["best-sellers"],
//   { revalidate: 3600 }
// );

export const getProduct = cache(
  (id: string) => {
    const product = db.product.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
        packagingDetails: true,
      },
    });
    return product;
  },
  [`product-${crypto.randomUUID()}`],
  { revalidate: 3600 }
);

export const getProducts = cache(
  () => {
    const products = db.product.findMany({
      include: {
        images: true,
        packagingDetails: true,
      },
    });
    return products;
  },
  ["products"],
  { revalidate: 3600 }
);

export const getProductsPagination = cache(
  ({ page = 1, pageSize = 9 }: { page?: number; pageSize?: number } = {}) => {
    const skip = (page - 1) * pageSize;

    const products = db.product.findMany({
      include: {
        images: true,
      },
      skip,
      take: pageSize,
    });

    return products;
  },
  ["products"],
  { revalidate: 3600 }
);

export const getProductsCount = cache(
  async () => {
    const count = await db.product.count();
    return count;
  },
  ["products-count"],
  { revalidate: 3600 }
);
