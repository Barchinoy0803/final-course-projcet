-- DropForeignKey
ALTER TABLE "ReturnedProducts" DROP CONSTRAINT "ReturnedProducts_contractId_fkey";

-- AddForeignKey
ALTER TABLE "ReturnedProducts" ADD CONSTRAINT "ReturnedProducts_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;
