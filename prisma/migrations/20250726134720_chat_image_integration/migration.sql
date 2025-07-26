/*
  Warnings:

  - You are about to drop the `creative` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `creative_history` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "creative" DROP CONSTRAINT "creative_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "creative_history" DROP CONSTRAINT "creative_history_creativeId_fkey";

-- DropForeignKey
ALTER TABLE "creative_history" DROP CONSTRAINT "creative_history_userId_fkey";

-- AlterTable
ALTER TABLE "artifact" ADD COLUMN     "imageId" TEXT;

-- AlterTable
ALTER TABLE "chat_message" ADD COLUMN     "sourceImageUrl" TEXT;

-- AlterTable
ALTER TABLE "organization" ALTER COLUMN "metadata" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "creative";

-- DropTable
DROP TABLE "creative_history";

-- CreateTable
CREATE TABLE "image" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "artifact" ADD CONSTRAINT "artifact_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
