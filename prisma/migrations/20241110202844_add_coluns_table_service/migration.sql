-- AlterTable
ALTER TABLE "services" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
