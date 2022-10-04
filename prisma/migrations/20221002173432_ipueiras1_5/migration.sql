/*
  Warnings:

  - You are about to drop the column `categoryId` on the `categories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[categoryId]` on the table `storeUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `storeUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_categoryId_fkey";

-- DropIndex
DROP INDEX "categories_categoryId_key";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "categoryId";

-- AlterTable
ALTER TABLE "storeUser" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "storeUser_categoryId_key" ON "storeUser"("categoryId");

-- AddForeignKey
ALTER TABLE "storeUser" ADD CONSTRAINT "storeUser_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
