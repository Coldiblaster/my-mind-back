/*
  Warnings:

  - The primary key for the `company_services` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `companyId` on the `company_services` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `company_services` table. All the data in the column will be lost.
  - You are about to drop the `(companies)` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `(services)` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OpeningHours` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Weekday` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `company_id` to the `company_services` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `company_services` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `service_id` to the `company_services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "(companies)" DROP CONSTRAINT "(companies)_addressId_fkey";

-- DropForeignKey
ALTER TABLE "OpeningHours" DROP CONSTRAINT "OpeningHours_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "OpeningHours" DROP CONSTRAINT "OpeningHours_weekday_id_fkey";

-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_company_id_fkey";

-- DropForeignKey
ALTER TABLE "company_services" DROP CONSTRAINT "company_services_companyId_fkey";

-- DropForeignKey
ALTER TABLE "company_services" DROP CONSTRAINT "company_services_serviceId_fkey";

-- AlterTable
ALTER TABLE "company_services" DROP CONSTRAINT "company_services_pkey",
DROP COLUMN "companyId",
DROP COLUMN "serviceId",
ADD COLUMN     "company_id" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "service_id" TEXT NOT NULL,
ADD CONSTRAINT "company_services_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "(companies)";

-- DropTable
DROP TABLE "(services)";

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "OpeningHours";

-- DropTable
DROP TABLE "Weekday";

-- DropTable
DROP TABLE "admins";

-- CreateTable
CREATE TABLE "professionals" (
    "id" TEXT NOT NULL,
    "clerk_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "company_id" TEXT NOT NULL,

    CONSTRAINT "professionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "address_id" TEXT NOT NULL,
    "business_type_id" INTEGER NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_types" (
    "id" SERIAL NOT NULL,
    "icon" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "business_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "complement" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "time" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opening_hours" (
    "id" TEXT NOT NULL,
    "professional_id" TEXT NOT NULL,
    "weekday_id" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "opening_hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weekdays" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "weekdays_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "opening_hours_professional_id_weekday_id_key" ON "opening_hours"("professional_id", "weekday_id");

-- CreateIndex
CREATE UNIQUE INDEX "weekdays_name_key" ON "weekdays"("name");

-- AddForeignKey
ALTER TABLE "professionals" ADD CONSTRAINT "professionals_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_business_type_id_fkey" FOREIGN KEY ("business_type_id") REFERENCES "business_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_services" ADD CONSTRAINT "company_services_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_services" ADD CONSTRAINT "company_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opening_hours" ADD CONSTRAINT "opening_hours_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opening_hours" ADD CONSTRAINT "opening_hours_weekday_id_fkey" FOREIGN KEY ("weekday_id") REFERENCES "weekdays"("id") ON DELETE CASCADE ON UPDATE CASCADE;
