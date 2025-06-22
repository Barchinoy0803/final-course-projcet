/*
  Warnings:

  - The values [ISACTIVE] on the enum `USER_STATUS` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "USER_STATUS_new" AS ENUM ('ACTIVE', 'INACTIVE');
ALTER TABLE "User" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "status" TYPE "USER_STATUS_new" USING ("status"::text::"USER_STATUS_new");
ALTER TYPE "USER_STATUS" RENAME TO "USER_STATUS_old";
ALTER TYPE "USER_STATUS_new" RENAME TO "USER_STATUS";
DROP TYPE "USER_STATUS_old";
ALTER TABLE "User" ALTER COLUMN "status" SET DEFAULT 'INACTIVE';
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "status" SET DEFAULT 'INACTIVE';
