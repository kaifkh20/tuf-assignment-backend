/*
  Warnings:

  - You are about to drop the column `timeStamp` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `submissionTimeStamp` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Submission` DROP COLUMN `timeStamp`,
    ADD COLUMN `submissionTimeStamp` DATETIME(3) NOT NULL;
