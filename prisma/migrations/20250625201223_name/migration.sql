-- DropForeignKey
ALTER TABLE "Debt" DROP CONSTRAINT "Debt_contractId_fkey";

-- DropForeignKey
ALTER TABLE "ReturnedProducts" DROP CONSTRAINT "ReturnedProducts_contractId_fkey";

-- AddForeignKey
ALTER TABLE "Debt" ADD CONSTRAINT "Debt_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReturnedProducts" ADD CONSTRAINT "ReturnedProducts_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
