"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";

export function PatientForm() {
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
      // const userData = { name, email, phone };
      // const user = await createUser(userData);
      // if (user) {
      //   router.push(`/patients/${user.id}/register`);
      // }
    } catch (error) {
      console.log(error);
    }
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="text-3xl font-bold">Hi There</h1>
          <p className="text-dark-700 ">Schedule your first appointment.</p>
        </section>
        <CustomFormField
          control={form.control}
          name="name"
          label="Full name"
          placeholder="Yunus Mujadidi"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
          fieldType={FormFieldType.INPUT}
        />
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

        <SubmitButton>Get Started</SubmitButton>
      </form>
    </Form>
  );
}
