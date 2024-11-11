-- DropForeignKey
ALTER TABLE "service_suggestions" DROP CONSTRAINT "service_suggestions_business_type_id_fkey";

-- AlterTable
ALTER TABLE "service_suggestions" ALTER COLUMN "business_type_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "service_suggestions" ADD CONSTRAINT "service_suggestions_business_type_id_fkey" FOREIGN KEY ("business_type_id") REFERENCES "business_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
