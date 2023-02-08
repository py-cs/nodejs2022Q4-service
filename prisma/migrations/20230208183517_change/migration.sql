-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_isFavorite_fkey";

-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_isFavorite_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_isFavorite_fkey";

-- AlterTable
ALTER TABLE "Album" ALTER COLUMN "isFavorite" DROP NOT NULL,
ALTER COLUMN "isFavorite" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Artist" ALTER COLUMN "isFavorite" DROP NOT NULL,
ALTER COLUMN "isFavorite" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Track" ALTER COLUMN "isFavorite" DROP NOT NULL,
ALTER COLUMN "isFavorite" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_isFavorite_fkey" FOREIGN KEY ("isFavorite") REFERENCES "Favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_isFavorite_fkey" FOREIGN KEY ("isFavorite") REFERENCES "Favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_isFavorite_fkey" FOREIGN KEY ("isFavorite") REFERENCES "Favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
