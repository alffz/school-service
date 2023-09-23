-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ruang_kelas` (
    `id_ruang_kelas` INTEGER NOT NULL AUTO_INCREMENT,
    `nomor_ruangan` INTEGER NOT NULL,
    `kapasitas` INTEGER NOT NULL,
    `tersedia` BOOLEAN NULL,

    UNIQUE INDEX `ruang_kelas_nomor_ruangan_key`(`nomor_ruangan`),
    PRIMARY KEY (`id_ruang_kelas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kelas` (
    `id_kelas` INTEGER NOT NULL AUTO_INCREMENT,
    `nomor_ruang_kelas` INTEGER NOT NULL,
    `kelas` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id_kelas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Guru` (
    `id_guru` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `id_kelas` INTEGER NULL,

    UNIQUE INDEX `Guru_email_key`(`email`),
    PRIMARY KEY (`id_guru`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pelajaran` (
    `id_pelajara` INTEGER NOT NULL AUTO_INCREMENT,
    `pelajaran` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_pelajara`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `murid` (
    `id_murid` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `id_kelas` INTEGER NULL,

    UNIQUE INDEX `murid_email_key`(`email`),
    PRIMARY KEY (`id_murid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jadwal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pelajaran` INTEGER NOT NULL,
    `id_guru` INTEGER NOT NULL,
    `id_kelas` INTEGER NOT NULL,
    `hari` INTEGER NOT NULL,
    `mulai` JSON NOT NULL,
    `berakhir` JSON NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kehadiran_murid` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_jadwal` INTEGER NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `id_murid` INTEGER NOT NULL,
    `keterangan` ENUM('absen', 'ijin', 'hadir') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kehadiran_guru` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_jadwal` INTEGER NOT NULL,
    `id_guru` INTEGER NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `kelas` ADD CONSTRAINT `kelas_nomor_ruang_kelas_fkey` FOREIGN KEY (`nomor_ruang_kelas`) REFERENCES `ruang_kelas`(`nomor_ruangan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Guru` ADD CONSTRAINT `Guru_id_kelas_fkey` FOREIGN KEY (`id_kelas`) REFERENCES `kelas`(`id_kelas`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `murid` ADD CONSTRAINT `murid_id_kelas_fkey` FOREIGN KEY (`id_kelas`) REFERENCES `kelas`(`id_kelas`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jadwal` ADD CONSTRAINT `Jadwal_id_pelajaran_fkey` FOREIGN KEY (`id_pelajaran`) REFERENCES `pelajaran`(`id_pelajara`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jadwal` ADD CONSTRAINT `Jadwal_id_guru_fkey` FOREIGN KEY (`id_guru`) REFERENCES `Guru`(`id_guru`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jadwal` ADD CONSTRAINT `Jadwal_id_kelas_fkey` FOREIGN KEY (`id_kelas`) REFERENCES `kelas`(`id_kelas`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kehadiran_murid` ADD CONSTRAINT `Kehadiran_murid_id_jadwal_fkey` FOREIGN KEY (`id_jadwal`) REFERENCES `Jadwal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kehadiran_murid` ADD CONSTRAINT `Kehadiran_murid_id_murid_fkey` FOREIGN KEY (`id_murid`) REFERENCES `murid`(`id_murid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kehadiran_guru` ADD CONSTRAINT `Kehadiran_guru_id_jadwal_fkey` FOREIGN KEY (`id_jadwal`) REFERENCES `Jadwal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
