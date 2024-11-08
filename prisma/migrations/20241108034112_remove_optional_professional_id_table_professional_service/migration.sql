/*
  Warnings:

  - Made the column `professional_id` on table `professional_services` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "professional_services" ALTER COLUMN "professional_id" SET NOT NULL;
