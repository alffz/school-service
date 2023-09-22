/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `ruang_kelas` table. All the data in the column will be lost.
  - Added the required column `id` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomor` to the `ruang_kelas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Admin` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ruang_kelas` DROP COLUMN `nama`,
    ADD COLUMN `nomor` INTEGER NOT NULL;
