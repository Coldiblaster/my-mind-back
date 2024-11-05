/*
  Warnings:

  - You are about to drop the `company_services` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "company_services" DROP CONSTRAINT "company_services_company_id_fkey";

-- DropForeignKey
ALTER TABLE "company_services" DROP CONSTRAINT "company_services_service_id_fkey";

-- DropTable
DROP TABLE "company_services";

-- CreateTable
CREATE TABLE "professional_services" (
    "id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "professional_id" TEXT,

    CONSTRAINT "professional_services_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "professional_services" ADD CONSTRAINT "professional_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professional_services" ADD CONSTRAINT "professional_services_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professionals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
