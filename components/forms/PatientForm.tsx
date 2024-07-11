"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField, { FormFieldType } from "./CustomFormField";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function PatientForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
