/*
  Warnings:

  - You are about to drop the column `id_guru` on the `murid` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `murid` DROP FOREIGN KEY `murid_id_guru_fkey`;

-- DropForeignKey
ALTER TABLE `murid` DROP FOREIGN KEY `murid_id_kelas_fkey`;

-- AlterTable
ALTER TABLE `Guru` ADD COLUMN `id_kelas` INTEGER NULL;

-- AlterTable
ALTER TABLE `Jadwal` MODIFY `status` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `murid` DROP COLUMN `id_guru`,
    MODIFY `id_kelas` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Guru` ADD CONSTRAINT `Guru_id_kelas_fkey` FOREIGN KEY (`id_kelas`) REFERENCES `kelas`(`id_kelas`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `murid` ADD CONSTRAINT `murid_id_kelas_fkey` FOREIGN KEY (`id_kelas`) REFERENCES `kelas`(`id_kelas`) ON DELETE SET NULL ON UPDATE CASCADE;
