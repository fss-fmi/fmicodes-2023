/*
  Warnings:

  - A unique constraint covering the columns `[captain_id]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `captain_id` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "captain_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Team_captain_id_key" ON "Team"("captain_id");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_captain_id_fkey" FOREIGN KEY ("captain_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
