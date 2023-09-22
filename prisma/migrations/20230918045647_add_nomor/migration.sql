/*
  Warnings:

  - You are about to drop the column `id_ruang_kelas` on the `kelas` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nomor]` on the table `ruang_kelas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nomor_ruang_kelas` to the `kelas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `kelas` DROP FOREIGN KEY `kelas_id_ruang_kelas_fkey`;

-- AlterTable
ALTER TABLE `kelas` DROP COLUMN `id_ruang_kelas`,
    ADD COLUMN `nomor_ruang_kelas` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ruang_kelas_nomor_key` ON `ruang_kelas`(`nomor`);

-- AddForeignKey
ALTER TABLE `kelas` ADD CONSTRAINT `kelas_nomor_ruang_kelas_fkey` FOREIGN KEY (`nomor_ruang_kelas`) REFERENCES `ruang_kelas`(`nomor`) ON DELETE RESTRICT ON UPDATE CASCADE;
