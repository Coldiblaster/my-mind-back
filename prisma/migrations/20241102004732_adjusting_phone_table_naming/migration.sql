/*
  Warnings:

  - You are about to drop the column `phoneId` on the `companies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "companies" DROP COLUMN "phoneId",
ADD COLUMN     "phone_id" TEXT;
