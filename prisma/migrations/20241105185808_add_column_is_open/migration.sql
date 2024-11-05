/*
  Warnings:

  - Added the required column `is_open` to the `opening_hours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "opening_hours" ADD COLUMN     "is_open" BOOLEAN NOT NULL;
