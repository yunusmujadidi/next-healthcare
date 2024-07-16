"use server";
import prisma from "../db";
import { parseStringify } from "../utils";

export const createUser = async (user: any) => {
  try {
    console.log("Checking if user exists with email:", user.email);
    const userExists = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (userExists) {
      console.log("User already exists:", userExists);
      return parseStringify(userExists);
    }

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
