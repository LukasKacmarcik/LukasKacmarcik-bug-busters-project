-- DropTables
DROP TABLE IF EXISTS `meal_images`;
DROP TABLE IF EXISTS `meals`;
DROP TABLE IF EXISTS `order_entry`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `restaurant_images`;
DROP TABLE IF EXISTS `user`;

-- CreateTable
CREATE TABLE `meal_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `meal_id` INTEGER NOT NULL,
    `real_url` VARCHAR(255) NOT NULL,
    `filename` VARCHAR(255) NOT NULL,

    INDEX `meal_images_fk0`(`meal_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meals` (
    `meal_name` VARCHAR(255) NOT NULL,
    `meal_id` INTEGER NOT NULL AUTO_INCREMENT,
    `restaurant_id` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `img_url` VARCHAR(255) NOT NULL,

    INDEX `meals_fk0`(`restaurant_id`),
    PRIMARY KEY (`meal_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_entry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `meal_id` INTEGER NOT NULL,
    `product_quantity` INTEGER NOT NULL,

    INDEX `order_entry_fk0`(`order_id`),
    INDEX `order_entry_fk1`(`meal_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `orders_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `restaurant_id` VARCHAR(191) NOT NULL,
    `rating` INTEGER NULL,

    UNIQUE INDEX `orders_id`(`orders_id`),
    INDEX `orders_fk0`(`user_id`),
    INDEX `orders_fk1`(`restaurant_id`),
    PRIMARY KEY (`orders_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurant_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `restaurant_id` VARCHAR(191) NOT NULL,
    `real_url` VARCHAR(255) NOT NULL,
    `filename` VARCHAR(255) NOT NULL,

    INDEX `restaurant_images_fk0`(`restaurant_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `username` VARCHAR(255) NOT NULL,
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email_address` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `email_address`(`email_address`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `meal_images` ADD CONSTRAINT `meal_images_fk0` FOREIGN KEY (`meal_id`) REFERENCES `meals`(`meal_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `meals` ADD CONSTRAINT `meals_fk0` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_entry` ADD CONSTRAINT `order_entry_fk0` FOREIGN KEY (`order_id`) REFERENCES `orders`(`orders_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_entry` ADD CONSTRAINT `order_entry_fk1` FOREIGN KEY (`meal_id`) REFERENCES `meals`(`meal_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_fk0` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_fk1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_images` ADD CONSTRAINT `restaurant_images_fk0` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
