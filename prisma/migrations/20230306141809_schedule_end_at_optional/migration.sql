/*
  Warnings:

  - The primary key for the `Schedule` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_pkey",
ALTER COLUMN "ends_at" DROP NOT NULL,
ADD CONSTRAINT "Schedule_pkey" PRIMARY KEY ("title", "starts_at");
