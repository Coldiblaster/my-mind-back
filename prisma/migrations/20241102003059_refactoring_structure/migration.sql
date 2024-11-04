/*
  Warnings:

  - A unique constraint covering the columns `[company_id,weekday_id]` on the table `opening_hours` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ProfessionalRole" AS ENUM ('ADMIN', 'SECRETARY', 'EMPLOYEE');

-- AlterTable
ALTER TABLE "opening_hours" ADD COLUMN     "company_id" TEXT,
ALTER COLUMN "professional_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "professionals" ADD COLUMN     "role" "ProfessionalRole" NOT NULL DEFAULT 'ADMIN';

-- CreateIndex
CREATE UNIQUE INDEX "company_weekday_unique" ON "opening_hours"("company_id", "weekday_id");

-- AddForeignKey
ALTER TABLE "opening_hours" ADD CONSTRAINT "opening_hours_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "opening_hours_professional_id_weekday_id_key" RENAME TO "professional_weekday_unique";
