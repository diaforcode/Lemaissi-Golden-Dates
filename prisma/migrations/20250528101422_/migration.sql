-- CreateTable
CREATE TABLE "PackagingDetail" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "packageSize" TEXT NOT NULL DEFAULT '500g',
    "boxesPerCarton" INTEGER NOT NULL DEFAULT 12,
    "cartonsPerPallet" INTEGER NOT NULL DEFAULT 56,
    "netWeightPer40ftContainer" DOUBLE PRECISION NOT NULL DEFAULT 6720,
    "netWeightPer20ftContainer" DOUBLE PRECISION NOT NULL DEFAULT 3024,

    CONSTRAINT "PackagingDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PackagingDetail" ADD CONSTRAINT "PackagingDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
