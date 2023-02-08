-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Favorites" (
    "id" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_isFavorite_fkey" FOREIGN KEY ("isFavorite") REFERENCES "Favorites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_isFavorite_fkey" FOREIGN KEY ("isFavorite") REFERENCES "Favorites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_isFavorite_fkey" FOREIGN KEY ("isFavorite") REFERENCES "Favorites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
