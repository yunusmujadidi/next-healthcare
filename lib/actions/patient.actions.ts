"use server";
import prisma from "../db";
import { parseStringify } from "../utils";

export const createUser = async (user: any) => {
  try {
    console.log("Creating new user with data:", user);
    const newUser = await prisma.user.create({
      data: {
        ...user,
      },
    });

    console.log("New user created:", newUser);
    return parseStringify(newUser);
  } catch (error) {
    console.error("Error in createUser:", error);
    return {
      error: "An error occurred while creating the user",
    };
  }
};

export const getUser = async (userId: string) => {
  const user = await prisma.user.findMany({
    where: {
      id: userId,
    },
  });
  return parseStringify(user);
};

export const registerPatient = async (patientData: any) => {
  try {
    console.log("Registering new patient with data:", patientData);

    // Create the patient record
    const newPatient = await prisma.patient.create({
      data: {
        name: patientData.name,
        email: patientData.email,
        phone: patientData.phone,
        birthDate: patientData.birthDate,
        gender: patientData.gender,
        address: patientData.address,
        occupation: patientData.occupation,
        emergencyContactName: patientData.emergencyContactName,
        emergencyContactNumber: patientData.emergencyContactNumber,
        primaryPhysician: patientData.primaryPhysician,
        insuranceProvider: patientData.insuranceProvider,
        insurancePolicyNumber: patientData.insurancePolicyNumber,
        allergies: patientData.allergies,
        currentMedication: patientData.currentMedication,
        familyMedicalHistory: patientData.familyMedicalHistory,
        pastMedicalHistory: patientData.pastMedicalHistory,
        identificationType: patientData.identificationType,
        identificationNumber: patientData.identificationNumber,
        identificationDocument: patientData.identificationDocument,
        treatmentConsent: patientData.treatmentConsent,
        disclosureConsent: patientData.disclosureConsent,
        privacyConsent: patientData.privacyConsent,
      },
    });

    console.log("New patient registered:", newPatient);
    return parseStringify(newPatient);
  } catch (error) {
    console.error("Error in registerPatient:", error);
    return {
      error: "An error occurred while registering the patient",
    };
  }
};
