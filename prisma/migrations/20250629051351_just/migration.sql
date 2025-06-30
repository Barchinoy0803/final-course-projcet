-- DropForeignKey
ALTER TABLE "Partners" DROP CONSTRAINT "Partners_userId_fkey";

-- AlterTable
ALTER TABLE "Partners" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Partners" ADD CONSTRAINT "Partners_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
