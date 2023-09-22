/*
  Warnings:

  - Added the required column `keterangan` to the `Kehadiran_murid` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Kehadiran_murid` ADD COLUMN `keterangan` ENUM('absen', 'ijin', 'hadir') NOT NULL;
