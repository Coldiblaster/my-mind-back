-- CreateTable
CREATE TABLE "service_suggestions" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "time" DOUBLE PRECISION NOT NULL,
    "business_type_id" INTEGER NOT NULL,

    CONSTRAINT "service_suggestions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "service_suggestions" ADD CONSTRAINT "service_suggestions_business_type_id_fkey" FOREIGN KEY ("business_type_id") REFERENCES "business_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
