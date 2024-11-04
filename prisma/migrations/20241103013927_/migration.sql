/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `professionals` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "professionals_email_key" ON "professionals"("email");
