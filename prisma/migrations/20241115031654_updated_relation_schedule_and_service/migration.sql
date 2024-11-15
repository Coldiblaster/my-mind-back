/*
  Warnings:

  - You are about to drop the `availability_services` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `service_id` to the `schedulings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "availability_services" DROP CONSTRAINT "availability_services_availability_id_fkey";

-- DropForeignKey
ALTER TABLE "availability_services" DROP CONSTRAINT "availability_services_service_id_fkey";

-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "serviceId" TEXT;

-- AlterTable
ALTER TABLE "schedulings" ADD COLUMN     "service_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "availability_services";

-- AddForeignKey
ALTER TABLE "schedulings" ADD CONSTRAINT "schedulings_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE SET NULL ON UPDATE CASCADE;
