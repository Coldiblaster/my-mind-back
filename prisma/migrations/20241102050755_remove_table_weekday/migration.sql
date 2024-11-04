/*
  Warnings:

  - You are about to drop the column `weekday_id` on the `opening_hours` table. All the data in the column will be lost.
  - You are about to drop the `weekdays` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `weekday` to the `opening_hours` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_business_type_id_fkey";

-- DropForeignKey
ALTER TABLE "opening_hours" DROP CONSTRAINT "opening_hours_weekday_id_fkey";

-- DropIndex
DROP INDEX "company_weekday_unique";

-- DropIndex
DROP INDEX "professional_weekday_unique";

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "customSegment" TEXT,
ALTER COLUMN "business_type_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "opening_hours" DROP COLUMN "weekday_id",
ADD COLUMN     "weekday" TEXT NOT NULL;

-- DropTable
DROP TABLE "weekdays";

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_business_type_id_fkey" FOREIGN KEY ("business_type_id") REFERENCES "business_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
