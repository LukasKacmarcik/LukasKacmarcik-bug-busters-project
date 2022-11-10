/*
  Warnings:

  - Added the required column `owner_id` to the `restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `restaurant` ADD COLUMN `owner_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` VARCHAR(255) NOT NULL;
