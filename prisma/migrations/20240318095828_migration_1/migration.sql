-- CreateTable
CREATE TABLE `Submission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `codeLanguage` VARCHAR(191) NOT NULL,
    `stdInput` VARCHAR(191) NOT NULL,
    `sourceCode` LONGBLOB NOT NULL,
    `timseStamp` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
