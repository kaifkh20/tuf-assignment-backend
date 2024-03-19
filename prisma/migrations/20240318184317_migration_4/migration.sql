/*
  Warnings:

  - You are about to drop the column `timseStamp` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `timeStamp` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Submission` DROP COLUMN `timseStamp`,
    ADD COLUMN `timeStamp` DATETIME(3) NOT NULL;
