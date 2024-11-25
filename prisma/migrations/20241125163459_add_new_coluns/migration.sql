/*
  Warnings:

  - A unique constraint covering the columns `[company_link]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_name]` on the table `professionals` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "company_link" TEXT;

-- AlterTable
ALTER TABLE "professionals" ADD COLUMN     "user_name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "companies_company_link_key" ON "companies"("company_link");

-- CreateIndex
CREATE UNIQUE INDEX "professionals_user_name_key" ON "professionals"("user_name");
