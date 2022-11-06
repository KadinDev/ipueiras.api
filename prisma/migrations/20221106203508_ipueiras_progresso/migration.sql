/*
  Warnings:

  - You are about to drop the column `stripe_customer_id` on the `storeUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "storeUser" DROP COLUMN "stripe_customer_id";
