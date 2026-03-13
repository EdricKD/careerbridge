"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  Loader2,
} from "lucide-react";
import { getAppUrl, isSupabaseConfigured } from "@/lib/env";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { ROLE_HOME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type SignupRole = "student" | "university_admin" | "employer";

const roleOptions: Array<{
  value: SignupRole;
  label: string;
  description: string;
  icon: typeof GraduationCap;
}> = [
  {
    value: "student",
    label: "Student",
    description: "Discover career paths, shadowing, and guided next steps.",
    icon: GraduationCap,
  },
  {
    value: "university_admin",
    label: "University",
    description: "Support cohorts with insights, broadcasts, and partnerships.",
    icon: Building2,
  },
  {
    value: "employer",
    label: "Employer",
    description: "Publish opportunities and connect with emerging talent.",
    icon: BriefcaseBusiness,
  },
];

function getNextPath(role: SignupRole) {
  return role === "student" ? "/onboarding" : ROLE_HOME[role];
}

export function SignupForm() {
  const router = useRouter();
  const [role, setRole] = useState<SignupRole>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const organizationLabel =
    role === "student"
      ? "University or institution"
      : role === "university_admin"
        ? "University name"
        : "Company name";

  async function handleEmailSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!isSupabaseConfigured) {
      document.cookie = `careerbridge-role=${role}; path=/`;
      router.push(getNextPath(role));
      return;
    }

    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setError("Supabase is not configured.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${getAppUrl()}/auth/callback?next=${encodeURIComponent(getNextPath(role))}`,
        data: {
          role,
          full_name: fullName,
          organization_name: organizationName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      document.cookie = `careerbridge-role=${role}; path=/`;
      router.push(getNextPath(role));
      return;
    }

    setSuccess(
      "Your account has been created. Check your email to confirm your address before logging in.",
    );
    setLoading(false);
  }

  return (
    <Card className="w-full max-w-xl border-primary/10 p-8">
      <div>
        <p className="eyebrow">Get started</p>
        <h1 className="mt-4 text-4xl">Create your CareerBridge account</h1>
        <p className="mt-3 text-sm leading-7 text-slate-500">
          Start by choosing your role, then create the account that will power
          your CareerBridge experience.
        </p>
      </div>

      {!isSupabaseConfigured ? (
        <div className="mt-6 rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-4 text-sm text-amber-700">
          Supabase credentials are not configured, so signup runs in preview
          mode with route access and demo data.
        </div>
      ) : null}

      <div className="mt-8">
        <p className="text-sm font-medium text-slate-700">Choose your role</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {roleOptions.map((option) => {
            const Icon = option.icon;

            return (
              <button
                key={option.value}
                type="button"
                className={cn(
                  "rounded-[24px] border bg-white p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft",
                  role === option.value
                    ? "border-primary bg-primary text-white shadow-lift"
                    : "border-border text-slate-900",
                )}
                onClick={() => setRole(option.value)}
              >
                <div
                  className={cn(
                    "inline-flex rounded-2xl p-3",
                    role === option.value
                      ? "bg-white/12 text-[#F59E0B]"
                      : "bg-primary/10 text-primary",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h2
                  className={cn(
                    "mt-4 text-lg",
                    role === option.value ? "text-white" : "text-slate-900",
                  )}
                >
                  {option.label}
                </h2>
                <p
                  className={cn(
                    "mt-2 text-sm leading-6",
                    role === option.value ? "text-white/75" : "text-slate-500",
                  )}
                >
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={handleEmailSignup}>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">
            Full name
          </label>
          <Input
            required
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Adwoa Owusu"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <Input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@careerbridgeghana.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            {organizationLabel}
          </label>
          <Input
            required
            value={organizationName}
            onChange={(event) => setOrganizationName(event.target.value)}
            placeholder={
              role === "student"
                ? "University of Ghana"
                : role === "university_admin"
                  ? "KNUST Careers Office"
                  : "Meltwater Entrepreneurial School of Technology"
            }
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Password</label>
          <Input
            type="password"
            required={isSupabaseConfigured}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a secure password"
          />
        </div>

        {error ? <p className="text-sm text-error md:col-span-2">{error}</p> : null}
        {success ? (
          <p className="text-sm text-primary md:col-span-2">{success}</p>
        ) : null}

        <Button className="w-full md:col-span-2" type="submit" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Create account
          {!loading ? <ArrowRight className="ml-2 h-4 w-4" /> : null}
        </Button>
      </form>

      <p className="mt-6 text-sm text-slate-500">
        Already registered?{" "}
        <Link href="/login" className="font-semibold text-primary">
          Log in
        </Link>
      </p>
    </Card>
  );
}
