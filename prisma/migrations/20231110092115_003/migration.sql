/*
  Warnings:

  - You are about to drop the column `userId` on the `quizzes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "quizzes" DROP CONSTRAINT "quizzes_userId_fkey";

-- AlterTable
ALTER TABLE "quizzes" DROP COLUMN "userId";
