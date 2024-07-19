"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { User } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Doctors, IdentificationTypes } from "@/lib/const";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { FileUploader } from "./FileUploader";

const GenderOptions = ["Male", "Female"];

export function RegisterForm(user: any) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const userData = { ...values };
      const response = await createUser(userData);

      if ("error" in response) {
        // Handle the error case
        console.error(response.error);
        // You might want to show an error message to the user here
      } else if ("id" in response) {
        // Successfully created user
        router.push(`/patients/${response.id}/register`);
      } else {
        // Handle unexpected response
        console.error("Unexpected response from createUser:", response);
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-dark-700 ">Let us know more about your self</p>
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>
        <CustomFormField
          control={form.control}
          name="name"
          placeholder="Yunus Mujadidi"
          label="Full name"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
          fieldType={FormFieldType.INPUT}
        />
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="yunusmujadidi@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
            fieldType={FormFieldType.INPUT}
          />
          <CustomFormField
            control={form.control}
            name="phone"
            label="Phone number"
            placeholder="(+62) 812-3456-7890"
            fieldType={FormFieldType.PHONE_INPUT}
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField
            control={form.control}
            name="gender"
            label="Gender"
            fieldType={FormFieldType.SKELETON}
            renderSkeleton={() => (
              <FormControl>
                <RadioGroup className="flex h-11 gap-6 xl:justify-between">
                  {GenderOptions.map((option) => (
                    <div className="radio-group" key={option}>
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
          <CustomFormField
            control={form.control}
            name="birthDate"
            label="Date of Birth"
            placeholder="MM/DD/YYYY"
            fieldType={FormFieldType.DATE_PICKER}
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField
            control={form.control}
            name="address"
            label="Address"
            placeholder="Jl. Kebon Jeruk No. 1"
            fieldType={FormFieldType.INPUT}
          />
          <CustomFormField
            control={form.control}
            name="occupation"
            label="Occupation"
            placeholder="Software Engineer"
            fieldType={FormFieldType.INPUT}
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField
            control={form.control}
            name="emergencyContactName"
            label="Emergency Contact Name"
            placeholder="Guardian Name"
            fieldType={FormFieldType.INPUT}
          />
          <CustomFormField
            control={form.control}
            name="emergencyContactNumber"
            label="Emergency Contact Number"
            placeholder="(+62) 812-3456-7890"
            fieldType={FormFieldType.PHONE_INPUT}
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>
        <CustomFormField
          control={form.control}
          name="primaryPhysician"
          label="Primary Physician"
          placeholder="Select your primary physician"
          fieldType={FormFieldType.SELECT}
        >
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className="flex cursor-pointer items-center gap-2">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={32}
                  height={32}
                  className="rounded-full border border-dark-500"
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField
            control={form.control}
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="BPJS Kesehatan"
            fieldType={FormFieldType.INPUT}
          />
          <CustomFormField
            control={form.control}
            name="insurancePolicyNumber"
            label="Insurance Policy Number"
            placeholder="1234567890"
            fieldType={FormFieldType.INPUT}
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField
            control={form.control}
            name="allergies"
            label="Allergies (if any)"
            placeholder="Peanuts, Seafood, etc."
            fieldType={FormFieldType.TEXTAREA}
          />
          <CustomFormField
            control={form.control}
            name="currentMedications"
            label="Current Medications"
            placeholder="Paracetamol, etc."
            fieldType={FormFieldType.TEXTAREA}
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField
            control={form.control}
            name="familyMedicalHistory"
            label="Family Medical History"
            placeholder="Diabetes, Hypertension, etc."
            fieldType={FormFieldType.TEXTAREA}
          />
          <CustomFormField
            control={form.control}
            name="pastMedicalHistory"
            label="Past Medical History"
            placeholder="Asthma, etc."
            fieldType={FormFieldType.TEXTAREA}
          />
        </div>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          name="identificationType"
          label="Identification Type"
          placeholder="Select your identification type"
          fieldType={FormFieldType.SELECT}
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>
        <CustomFormField
          control={form.control}
          name="identificationNumber"
          label="Identification Number"
          placeholder="1234567890"
          fieldType={FormFieldType.INPUT}
        />

        <CustomFormField
          control={form.control}
          name="identificationDocument"
          label="Upload Identification Document"
          fieldType={FormFieldType.SKELETON}
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
}
