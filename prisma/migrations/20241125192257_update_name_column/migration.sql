/*
  Warnings:

  - You are about to drop the column `company_link` on the `companies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[link]` on the table `companies` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "companies_company_link_key";

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "company_link",
ADD COLUMN     "link" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "companies_link_key" ON "companies"("link");
