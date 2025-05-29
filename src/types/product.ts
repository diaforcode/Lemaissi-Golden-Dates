import { Prisma } from "@prisma/client";

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    images: true;
    // packagingDetails: true;
  };
}>;
