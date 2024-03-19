/*
  Warnings:

  - Added the required column `submissionToken` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Submission` ADD COLUMN `submissionOutput` VARCHAR(191) NULL,
    ADD COLUMN `submissionToken` VARCHAR(191) NOT NULL;
