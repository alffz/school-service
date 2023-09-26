/*
  Warnings:

  - The primary key for the `Guru` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_guru` on the `Guru` table. All the data in the column will be lost.
  - The primary key for the `kelas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_kelas` on the `kelas` table. All the data in the column will be lost.
  - The primary key for the `murid` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_murid` on the `murid` table. All the data in the column will be lost.
  - The primary key for the `pelajaran` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_pelajara` on the `pelajaran` table. All the data in the column will be lost.
  - The primary key for the `ruang_kelas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_ruang_kelas` on the `ruang_kelas` table. All the data in the column will be lost.
  - Added the required column `id` to the `Guru` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `kelas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `murid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `pelajaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `ruang_kelas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Guru` DROP FOREIGN KEY `Guru_id_kelas_fkey`;

-- DropForeignKey
ALTER TABLE `Jadwal` DROP FOREIGN KEY `Jadwal_id_guru_fkey`;

-- DropForeignKey
ALTER TABLE `Jadwal` DROP FOREIGN KEY `Jadwal_id_kelas_fkey`;

-- DropForeignKey
ALTER TABLE `Jadwal` DROP FOREIGN KEY `Jadwal_id_pelajaran_fkey`;

-- DropForeignKey
ALTER TABLE `Kehadiran_murid` DROP FOREIGN KEY `Kehadiran_murid_id_murid_fkey`;

-- DropForeignKey
ALTER TABLE `murid` DROP FOREIGN KEY `murid_id_kelas_fkey`;

-- AlterTable
ALTER TABLE `Guru` DROP PRIMARY KEY,
    DROP COLUMN `id_guru`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `kelas` DROP PRIMARY KEY,
    DROP COLUMN `id_kelas`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `murid` DROP PRIMARY KEY,
    DROP COLUMN `id_murid`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `pelajaran` DROP PRIMARY KEY,
    DROP COLUMN `id_pelajara`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ruang_kelas` DROP PRIMARY KEY,
    DROP COLUMN `id_ruang_kelas`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Guru` ADD CONSTRAINT `Guru_id_kelas_fkey` FOREIGN KEY (`id_kelas`) REFERENCES `kelas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `murid` ADD CONSTRAINT `murid_id_kelas_fkey` FOREIGN KEY (`id_kelas`) REFERENCES `kelas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jadwal` ADD CONSTRAINT `Jadwal_id_pelajaran_fkey` FOREIGN KEY (`id_pelajaran`) REFERENCES `pelajaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jadwal` ADD CONSTRAINT `Jadwal_id_guru_fkey` FOREIGN KEY (`id_guru`) REFERENCES `Guru`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jadwal` ADD CONSTRAINT `Jadwal_id_kelas_fkey` FOREIGN KEY (`id_kelas`) REFERENCES `kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kehadiran_murid` ADD CONSTRAINT `Kehadiran_murid_id_murid_fkey` FOREIGN KEY (`id_murid`) REFERENCES `murid`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
