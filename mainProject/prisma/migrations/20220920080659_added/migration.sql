/*
  Warnings:

  - Added the required column `img_url` to the `restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `restaurant` ADD COLUMN `img_url` VARCHAR(255) NOT NULL;
