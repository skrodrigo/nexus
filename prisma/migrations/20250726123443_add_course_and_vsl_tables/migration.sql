-- CreateEnum
CREATE TYPE "VslEventType" AS ENUM ('VIEW', 'PLAY', 'WATCH_25', 'WATCH_50', 'WATCH_75', 'WATCH_100', 'CTA_CLICK');

-- CreateTable
CREATE TABLE "vsl" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "slug" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "folderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vsl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vsl_folder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vsl_folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vsl_event" (
    "id" TEXT NOT NULL,
    "vslId" TEXT NOT NULL,
    "type" "VslEventType" NOT NULL,
    "viewerId" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vsl_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vsl_allowed_domain" (
    "id" TEXT NOT NULL,
    "vslId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vsl_allowed_domain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vsl_slug_key" ON "vsl"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "vsl_allowed_domain_vslId_domain_key" ON "vsl_allowed_domain"("vslId", "domain");

-- AddForeignKey
ALTER TABLE "vsl" ADD CONSTRAINT "vsl_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vsl" ADD CONSTRAINT "vsl_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "vsl_folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vsl_folder" ADD CONSTRAINT "vsl_folder_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vsl_event" ADD CONSTRAINT "vsl_event_vslId_fkey" FOREIGN KEY ("vslId") REFERENCES "vsl"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vsl_allowed_domain" ADD CONSTRAINT "vsl_allowed_domain_vslId_fkey" FOREIGN KEY ("vslId") REFERENCES "vsl"("id") ON DELETE CASCADE ON UPDATE CASCADE;
