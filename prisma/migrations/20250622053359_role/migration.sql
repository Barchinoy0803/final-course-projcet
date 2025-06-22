/*
  Warnings:

  - The values [STAFF] on the enum `ROLE` will be removed. If these variants are still used in the database, this will fail.
  - The values [SELLER] on the enum `USER_ROLE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ROLE_new" AS ENUM ('SELLER', 'CUSTOMER');
ALTER TABLE "Partners" ALTER COLUMN "role" TYPE "ROLE_new" USING ("role"::text::"ROLE_new");
ALTER TYPE "ROLE" RENAME TO "ROLE_old";
ALTER TYPE "ROLE_new" RENAME TO "ROLE";
DROP TYPE "ROLE_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "USER_ROLE_new" AS ENUM ('OWNER', 'STAFF');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "USER_ROLE_new" USING ("role"::text::"USER_ROLE_new");
ALTER TYPE "USER_ROLE" RENAME TO "USER_ROLE_old";
ALTER TYPE "USER_ROLE_new" RENAME TO "USER_ROLE";
DROP TYPE "USER_ROLE_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'STAFF';
