/*
  Warnings:

  - You are about to drop the column `serviceId` on the `clients` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_serviceId_fkey";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "serviceId";
