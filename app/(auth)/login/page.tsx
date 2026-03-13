import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Log In | CareerBridge Ghana",
  description:
    "Log in to CareerBridge Ghana to continue your student, university, or employer journey.",
};

export default function LoginPage() {
  return <LoginForm />;
}
