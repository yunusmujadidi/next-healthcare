-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DOCTOR', 'ADMIN', 'PATIENT');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'PATIENT';

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "privacyConsent" BOOLEAN NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "address" TEXT,
    "occupation" TEXT,
    "emergencyContactName" TEXT,
    "emergencyContactNumber" TEXT,
    "insuranceProvider" TEXT,
    "insurancePolicyNumber" TEXT,
    "allergies" TEXT,
    "currentMedication" TEXT,
    "familyMedicalHistory" TEXT,
    "pastMedicalHistory" TEXT,
    "identificationType" TEXT,
    "identificationNumber" TEXT,
    "identificationDocumentId" TEXT,
    "identificationDocumentUrl" TEXT,
    "primaryPhysician" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);
