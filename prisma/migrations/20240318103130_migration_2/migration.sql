/*
  Warnings:

  - You are about to drop the column `sourceCode` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `sourceCodeId` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Submission` DROP COLUMN `sourceCode`,
    ADD COLUMN `sourceCodeId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `SourceCode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sourceCode` LONGBLOB NOT NULL,
    `submissionId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SourceCode` ADD CONSTRAINT `SourceCode_submissionId_fkey` FOREIGN KEY (`submissionId`) REFERENCES `Submission`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
