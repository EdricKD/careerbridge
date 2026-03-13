import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Sign Up | CareerBridge Ghana",
  description:
    "Create a CareerBridge Ghana account as a student, university, or employer.",
};

export default function SignupPage() {
  return <SignupForm />;
}
