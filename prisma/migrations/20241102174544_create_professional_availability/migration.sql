/*
  Warnings:

  - You are about to drop the column `professional_id` on the `opening_hours` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "opening_hours" DROP CONSTRAINT "opening_hours_professional_id_fkey";

-- AlterTable
ALTER TABLE "opening_hours" DROP COLUMN "professional_id";

-- CreateTable
CREATE TABLE "professional_availabilities" (
    "id" TEXT NOT NULL,
    "professional_id" TEXT NOT NULL,
    "availability_date" TIMESTAMP(3) NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "is_booked" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "professional_availabilities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "professional_availabilities" ADD CONSTRAINT "professional_availabilities_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
