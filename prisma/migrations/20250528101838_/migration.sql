-- AlterTable
ALTER TABLE "PackagingDetail" ALTER COLUMN "packageSize" DROP DEFAULT,
ALTER COLUMN "boxesPerCarton" DROP DEFAULT,
ALTER COLUMN "cartonsPerPallet" DROP DEFAULT,
ALTER COLUMN "netWeightPer40ftContainer" DROP DEFAULT,
ALTER COLUMN "netWeightPer20ftContainer" DROP DEFAULT;
