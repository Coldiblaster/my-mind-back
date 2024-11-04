-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "name" TEXT,
ADD COLUMN     "phoneId" TEXT;

-- AlterTable
ALTER TABLE "professionals" ADD COLUMN     "document" TEXT,
ADD COLUMN     "name" TEXT;

-- CreateTable
CREATE TABLE "phones" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "company_id" TEXT,
    "professional_id" TEXT,

    CONSTRAINT "phones_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "phones" ADD CONSTRAINT "phones_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phones" ADD CONSTRAINT "phones_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professionals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
