/*
  Warnings:

  - You are about to drop the `Jadwal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Jadwal" DROP CONSTRAINT "Jadwal_id_guru_fkey";

-- DropForeignKey
ALTER TABLE "Jadwal" DROP CONSTRAINT "Jadwal_id_kelas_fkey";

-- DropForeignKey
ALTER TABLE "Jadwal" DROP CONSTRAINT "Jadwal_id_pelajaran_fkey";

-- DropForeignKey
ALTER TABLE "kehadiran_guru" DROP CONSTRAINT "kehadiran_guru_id_jadwal_fkey";

-- DropForeignKey
ALTER TABLE "kehadiran_murid" DROP CONSTRAINT "kehadiran_murid_id_jadwal_fkey";

-- DropTable
DROP TABLE "Jadwal";

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

-- AddForeignKey
ALTER TABLE "jadwal" ADD CONSTRAINT "jadwal_id_pelajaran_fkey" FOREIGN KEY ("id_pelajaran") REFERENCES "pelajaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal" ADD CONSTRAINT "jadwal_id_guru_fkey" FOREIGN KEY ("id_guru") REFERENCES "guru"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal" ADD CONSTRAINT "jadwal_id_kelas_fkey" FOREIGN KEY ("id_kelas") REFERENCES "kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kehadiran_murid" ADD CONSTRAINT "kehadiran_murid_id_jadwal_fkey" FOREIGN KEY ("id_jadwal") REFERENCES "jadwal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kehadiran_guru" ADD CONSTRAINT "kehadiran_guru_id_jadwal_fkey" FOREIGN KEY ("id_jadwal") REFERENCES "jadwal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
