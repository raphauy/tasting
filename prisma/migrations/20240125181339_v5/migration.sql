/*
  Warnings:

  - You are about to drop the column `vintage` on the `Wine` table. All the data in the column will be lost.
  - Added the required column `vintage` to the `Tasting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tasting" ADD COLUMN     "vintage" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Wine" DROP COLUMN "vintage";
