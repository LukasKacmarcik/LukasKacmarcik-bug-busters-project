-- CreateTable
DROP TABLE IF EXISTS `restaurant`;
CREATE TABLE `restaurant` (
    `id` VARCHAR(10) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `description` VARCHAR(120) NOT NULL,
    `address` VARCHAR(120) NOT NULL,
    `email` VARCHAR(120) NOT NULL,
    `phone_number` VARCHAR(30) NOT NULL,
    `delivery_fee` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
