/*
  Warnings:

  - You are about to drop the column `searchStore` on the `storeUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "storeUser" DROP COLUMN "searchStore",
ADD COLUMN     "instagram" TEXT;
