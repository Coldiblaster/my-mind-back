/*
  Warnings:

  - Added the required column `type` to the `phones` table without a default value. This is not possible if the table is not empty.
  - Made the column `professionalId` on table `schedulings` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "SchedulingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELED', 'COMPLETED', 'NO_SHOW');

-- DropForeignKey
ALTER TABLE "schedulings" DROP CONSTRAINT "schedulings_professionalId_fkey";

-- DropIndex
DROP INDEX "schedulings_availability_id_client_id_idx";

-- AlterTable
ALTER TABLE "phones" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "professionals" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "occupation" TEXT;

-- AlterTable
ALTER TABLE "schedulings" ADD COLUMN     "status" "SchedulingStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "professionalId" SET NOT NULL;

-- CreateTable
CREATE TABLE "professional_social_media" (
    "id" TEXT NOT NULL,
    "professional_id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "professional_social_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "scheduling_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "professional_social_media_professional_id_idx" ON "professional_social_media"("professional_id");

-- CreateIndex
CREATE INDEX "schedulings_availability_id_client_id_professionalId_idx" ON "schedulings"("availability_id", "client_id", "professionalId");

-- AddForeignKey
ALTER TABLE "professional_social_media" ADD CONSTRAINT "professional_social_media_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedulings" ADD CONSTRAINT "schedulings_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_scheduling_id_fkey" FOREIGN KEY ("scheduling_id") REFERENCES "schedulings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
