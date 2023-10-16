/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Guru` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Kehadiran_guru` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Kehadiran_murid` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Guru" DROP CONSTRAINT "Guru_id_kelas_fkey";

-- DropForeignKey
ALTER TABLE "Jadwal" DROP CONSTRAINT "Jadwal_id_guru_fkey";

-- DropForeignKey
ALTER TABLE "Kehadiran_guru" DROP CONSTRAINT "Kehadiran_guru_id_jadwal_fkey";

-- DropForeignKey
ALTER TABLE "Kehadiran_murid" DROP CONSTRAINT "Kehadiran_murid_id_jadwal_fkey";

-- DropForeignKey
ALTER TABLE "Kehadiran_murid" DROP CONSTRAINT "Kehadiran_murid_id_murid_fkey";

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Guru";

-- DropTable
DROP TABLE "Kehadiran_guru";

-- DropTable
DROP TABLE "Kehadiran_murid";

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guru" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "id_kelas" INTEGER,

    CONSTRAINT "guru_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kehadiran_murid" (
    "id" SERIAL NOT NULL,
    "id_jadwal" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "id_murid" INTEGER NOT NULL,
    "keterangan" "Keterangan" NOT NULL,

    CONSTRAINT "kehadiran_murid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kehadiran_guru" (
    "id" SERIAL NOT NULL,
    "id_jadwal" INTEGER NOT NULL,
    "id_guru" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kehadiran_guru_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "guru_email_key" ON "guru"("email");

-- AddForeignKey
ALTER TABLE "guru" ADD CONSTRAINT "guru_id_kelas_fkey" FOREIGN KEY ("id_kelas") REFERENCES "kelas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jadwal" ADD CONSTRAINT "Jadwal_id_guru_fkey" FOREIGN KEY ("id_guru") REFERENCES "guru"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kehadiran_murid" ADD CONSTRAINT "kehadiran_murid_id_jadwal_fkey" FOREIGN KEY ("id_jadwal") REFERENCES "Jadwal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kehadiran_murid" ADD CONSTRAINT "kehadiran_murid_id_murid_fkey" FOREIGN KEY ("id_murid") REFERENCES "murid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kehadiran_guru" ADD CONSTRAINT "kehadiran_guru_id_jadwal_fkey" FOREIGN KEY ("id_jadwal") REFERENCES "Jadwal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
