/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `business_types` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "business_types_label_key" ON "business_types"("label");
