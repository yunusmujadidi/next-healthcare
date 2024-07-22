/*
  Warnings:

  - You are about to drop the column `identificationDocumentId` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `identificationDocumentUrl` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `disclosureConsent` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `treatmentConsent` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "identificationDocumentId",
DROP COLUMN "identificationDocumentUrl",
ADD COLUMN     "disclosureConsent" BOOLEAN NOT NULL,
ADD COLUMN     "treatmentConsent" BOOLEAN NOT NULL;
