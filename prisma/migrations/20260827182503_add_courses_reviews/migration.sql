/*
  Warnings:

  - You are about to alter the column `averagePlacement` on the `College` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `highestPlacement` on the `College` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `fees` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the `Cutoff` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cutoff" DROP CONSTRAINT "Cutoff_collegeId_fkey";

-- DropIndex
DROP INDEX "College_location_idx";

-- DropIndex
DROP INDEX "College_name_idx";

-- DropIndex
DROP INDEX "College_rating_idx";

-- DropIndex
DROP INDEX "Course_collegeId_idx";

-- DropIndex
DROP INDEX "Review_collegeId_idx";

-- AlterTable
ALTER TABLE "College" ALTER COLUMN "averagePlacement" SET DATA TYPE INTEGER,
ALTER COLUMN "highestPlacement" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "fees",
ADD COLUMN     "degree" TEXT NOT NULL DEFAULT 'B.Tech',
ALTER COLUMN "duration" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "studentName" TEXT NOT NULL DEFAULT 'Anonymous';

-- DropTable
DROP TABLE "Cutoff";
