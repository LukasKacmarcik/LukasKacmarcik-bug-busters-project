-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(120) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item` (
    `id` VARCHAR(191) NOT NULL,
    `owner_id` INTEGER NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `description` VARCHAR(120) NOT NULL,
    `price` DOUBLE NOT NULL DEFAULT 0,
    `img_url` VARCHAR(255) NOT NULL,
    `buyer_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
