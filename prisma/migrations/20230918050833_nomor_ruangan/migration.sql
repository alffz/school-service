/*
  Warnings:

  - You are about to drop the column `nomor` on the `ruang_kelas` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nomor_ruangan]` on the table `ruang_kelas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nomor_ruangan` to the `ruang_kelas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `kelas` DROP FOREIGN KEY `kelas_nomor_ruang_kelas_fkey`;

-- DropIndex
DROP INDEX `ruang_kelas_nomor_key` ON `ruang_kelas`;

-- AlterTable
ALTER TABLE `ruang_kelas` DROP COLUMN `nomor`,
    ADD COLUMN `nomor_ruangan` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ruang_kelas_nomor_ruangan_key` ON `ruang_kelas`(`nomor_ruangan`);

-- AddForeignKey
ALTER TABLE `kelas` ADD CONSTRAINT `kelas_nomor_ruang_kelas_fkey` FOREIGN KEY (`nomor_ruang_kelas`) REFERENCES `ruang_kelas`(`nomor_ruangan`) ON DELETE RESTRICT ON UPDATE CASCADE;
