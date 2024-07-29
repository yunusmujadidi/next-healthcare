import Image from "next/image";
import Link from "next/link";
import { PatientForm } from "@/components/forms/PatientForm";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP VERIVICATION | Passkey modal*/}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            width={1000}
            height={1000}
            alt="patient "
            className="mb-10 h-10 w-fit"
          />
          <PatientForm />
          <div className="text-sm font-normal mt-20 flex justify-between">
            <p>Copyright 2024 CarePlus</p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.jpg"
        width={1000}
        height={1000}
        alt="patient "
        className="hidden h-full object-cover md:block max-w-[50%]"
      />
    </div>
  );
}
