-- AlterTable
ALTER TABLE "services" ADD COLUMN     "breakTime" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "availability_services" (
    "id" TEXT NOT NULL,
    "availability_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,

    CONSTRAINT "availability_services_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "availability_services" ADD CONSTRAINT "availability_services_availability_id_fkey" FOREIGN KEY ("availability_id") REFERENCES "availabilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "availability_services" ADD CONSTRAINT "availability_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
