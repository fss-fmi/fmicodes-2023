/*
  Warnings:

  - Added the required column `type` to the `Sponsor` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SponsorType" AS ENUM ('GOLD', 'SILVER', 'BRONZE');

-- AlterTable
ALTER TABLE "Sponsor" ADD COLUMN     "type" "SponsorType" NOT NULL;
