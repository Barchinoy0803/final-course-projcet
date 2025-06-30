/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "CONTRACT_TYPE" AS ENUM ('COMPLETED', 'RETURNED');

-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "status" "CONTRACT_TYPE" DEFAULT 'COMPLETED',
ALTER COLUMN "time" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");
