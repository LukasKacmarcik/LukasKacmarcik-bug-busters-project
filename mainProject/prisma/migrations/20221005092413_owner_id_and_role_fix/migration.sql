-- AddForeignKey
ALTER TABLE `restaurant` ADD CONSTRAINT `user_fk0` FOREIGN KEY (`owner_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
