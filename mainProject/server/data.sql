DROP DATABASE IF EXISTS food_bug;
CREATE DATABASE food_bug;
USE food_bug;

-- CreateTable
DROP TABLE IF EXISTS `restaurant`;
CREATE TABLE `restaurant` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `description` VARCHAR(120) NOT NULL,
    `address` VARCHAR(120) NOT NULL,
    `email` VARCHAR(120) NOT NULL,
    `phone_number` VARCHAR(30) NOT NULL,
    `delivery_fee` DOUBLE NOT NULL DEFAULT 0,
	`img_url` VARCHAR(255) NOT NULL

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
	`username`VARCHAR(255) NOT NULL,
	`user_id` INT(255) NOT NULL AUTO_INCREMENT,
	`email_address` VARCHAR(255) NOT NULL UNIQUE,
	`address` VARCHAR(255) NOT NULL,
	`password` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `meals`;
CREATE TABLE `meals` (
	`meal_name` VARCHAR(255) NOT NULL,
	`meal_id` INT(255) NOT NULL AUTO_INCREMENT,
	`restaurant_id` VARCHAR(191) NOT NULL,
	`price` DOUBLE NOT NULL,
	`img_url` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`meal_id`)

) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
	`orders_id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`user_id` INT NOT NULL,
	`restaurant_id` VARCHAR(191) NOT NULL,
	`rating` INT,
	PRIMARY KEY (`orders_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `order_entry`;
CREATE TABLE `order_entry` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`order_id` INT NOT NULL,
	`meal_id` INT NOT NULL,
	`product_quantity` INT NOT NULL,
	PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `restaurant_images`;
CREATE TABLE `restaurant_images` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`restaurant_id` VARCHAR(191) NOT NULL,
	`real_url` VARCHAR(255) NOT NULL,
	`filename` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `meal_images`;
CREATE TABLE `meal_images` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`meal_id` INT NOT NULL,
	`real_url` VARCHAR(255) NOT NULL,
	`filename` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `meals` ADD CONSTRAINT `meals_fk0` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant`(`id`);

ALTER TABLE `orders` ADD CONSTRAINT `orders_fk0` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`);

ALTER TABLE `orders` ADD CONSTRAINT `orders_fk1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant`(`id`);

ALTER TABLE `order_entry` ADD CONSTRAINT `order_entry_fk0` FOREIGN KEY (`order_id`) REFERENCES `orders`(`orders_id`);

ALTER TABLE `order_entry` ADD CONSTRAINT `order_entry_fk1` FOREIGN KEY (`meal_id`) REFERENCES `meals`(`meal_id`);

ALTER TABLE `restaurant_images` ADD CONSTRAINT `restaurant_images_fk0` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant`(`id`);

ALTER TABLE `meal_images` ADD CONSTRAINT `meal_images_fk0` FOREIGN KEY (`meal_id`) REFERENCES `meals`(`meal_id`);
