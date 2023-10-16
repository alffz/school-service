-- CreateEnum
CREATE TYPE "Keterangan" AS ENUM ('absen', 'ijin', 'hadir');

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ruang_kelas" (
    "id" SERIAL NOT NULL,
    "nomor_ruangan" INTEGER NOT NULL,
    "kapasitas" INTEGER NOT NULL,
    "tersedia" BOOLEAN,

    CONSTRAINT "ruang_kelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kelas" (
    "id" SERIAL NOT NULL,
    "nomor_ruang_kelas" INTEGER NOT NULL,
    "kelas" VARCHAR(30) NOT NULL,

    CONSTRAINT "kelas_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "pelajaran" (
    "id" SERIAL NOT NULL,
    "pelajaran" VARCHAR(50) NOT NULL,

    CONSTRAINT "pelajaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "murid" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "id_kelas" INTEGER,

    CONSTRAINT "murid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jadwal" (
    "id" SERIAL NOT NULL,
    "id_pelajaran" INTEGER NOT NULL,
    "id_guru" INTEGER NOT NULL,
    "id_kelas" INTEGER NOT NULL,
    "hari" INTEGER NOT NULL,
    "mulai" JSONB NOT NULL,
    "berakhir" JSONB NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "jadwal_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "ruang_kelas_nomor_ruangan_key" ON "ruang_kelas"("nomor_ruangan");

-- CreateIndex
CREATE UNIQUE INDEX "guru_email_key" ON "guru"("email");

-- CreateIndex
CREATE UNIQUE INDEX "murid_email_key" ON "murid"("email");

-- AddForeignKey
ALTER TABLE "kelas" ADD CONSTRAINT "kelas_nomor_ruang_kelas_fkey" FOREIGN KEY ("nomor_ruang_kelas") REFERENCES "ruang_kelas"("nomor_ruangan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guru" ADD CONSTRAINT "guru_id_kelas_fkey" FOREIGN KEY ("id_kelas") REFERENCES "kelas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "murid" ADD CONSTRAINT "murid_id_kelas_fkey" FOREIGN KEY ("id_kelas") REFERENCES "kelas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal" ADD CONSTRAINT "jadwal_id_pelajaran_fkey" FOREIGN KEY ("id_pelajaran") REFERENCES "pelajaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal" ADD CONSTRAINT "jadwal_id_guru_fkey" FOREIGN KEY ("id_guru") REFERENCES "guru"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal" ADD CONSTRAINT "jadwal_id_kelas_fkey" FOREIGN KEY ("id_kelas") REFERENCES "kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kehadiran_murid" ADD CONSTRAINT "kehadiran_murid_id_jadwal_fkey" FOREIGN KEY ("id_jadwal") REFERENCES "jadwal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kehadiran_murid" ADD CONSTRAINT "kehadiran_murid_id_murid_fkey" FOREIGN KEY ("id_murid") REFERENCES "murid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kehadiran_guru" ADD CONSTRAINT "kehadiran_guru_id_jadwal_fkey" FOREIGN KEY ("id_jadwal") REFERENCES "jadwal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
