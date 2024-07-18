import { PatientForm } from "@/components/forms/PatientForm";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";

const Register = ({ params: { userId } }: { params: { userId: string } }) => {
  const user = getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            width={1000}
            height={1000}
            alt="patient "
            className="mb-10 h-10 w-fit"
          />
          <RegisterForm user={user} />
          <div className="text-sm font-normal mt-20 flex justify-between">
            <p>Copyright 2024 CarePlus</p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        width={1000}
        height={1000}
        alt="patient "
        className="hidden h-full object-cover md:block max-w-[50%]"
      />
    </div>
  );
};

export default Register;
