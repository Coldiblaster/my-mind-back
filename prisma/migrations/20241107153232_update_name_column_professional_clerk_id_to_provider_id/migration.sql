/*
  Warnings:

  - You are about to drop the column `clerk_id` on the `professionals` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider_id]` on the table `professionals` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provider_id` to the `professionals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "professionals" DROP COLUMN "clerk_id",
ADD COLUMN     "provider_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "professionals_provider_id_key" ON "professionals"("provider_id");
