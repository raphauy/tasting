/*
  Warnings:

  - You are about to drop the column `vintage` on the `Tasting` table. All the data in the column will be lost.
  - Added the required column `vintage` to the `Wine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tasting" DROP COLUMN "vintage";

-- AlterTable
ALTER TABLE "Wine" ADD COLUMN     "vintage" INTEGER NOT NULL;
