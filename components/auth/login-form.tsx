"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { ROLE_HOME } from "@/lib/constants";
import type { UserRole } from "@/types/app";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

function normalizeRole(value: string | undefined): UserRole | null {
  if (
    value === "student" ||
    value === "university_admin" ||
    value === "employer" ||
    value === "super_admin"
  ) {
    return value;
  }

  return null;
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectToParam = searchParams.get("redirectTo");
  const redirectTo = redirectToParam?.startsWith("/") ? redirectToParam : null;
  const status = searchParams.get("status");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [previewRole, setPreviewRole] = useState<UserRole>("student");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleEmailLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured) {
      document.cookie = `careerbridge-role=${previewRole}; path=/`;
      router.push(redirectTo ?? ROLE_HOME[previewRole]);
      return;
    }

    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setError("Supabase is not configured.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    let role =
      normalizeRole(
        (data.user?.user_metadata?.role as string | undefined) ??
          (data.user?.app_metadata?.role as string | undefined),
      ) ?? null;

    if (!role && data.user) {
      const { data: userRow } = await supabase
        .from("users")
        .select("role")
        .eq("id", data.user.id)
        .maybeSingle();
      role = normalizeRole((userRow as { role?: string } | null)?.role);
    }

    const resolvedRole = role ?? "student";
    document.cookie = `careerbridge-role=${resolvedRole}; path=/`;
    router.push(redirectTo ?? ROLE_HOME[resolvedRole]);
  }

  return (
    <Card className="w-full max-w-lg border-primary/10 p-8">
      <div>
        <p className="eyebrow">Welcome back</p>
        <h1 className="mt-4 text-4xl">Log in to CareerBridge Ghana</h1>
        <p className="mt-3 text-sm leading-7 text-slate-500">
          Continue your student, university, or employer journey with your
          email and password.
        </p>
      </div>

      {status === "check-email" ? (
        <div className="mt-6 rounded-2xl border border-primary/15 bg-primary/5 p-4 text-sm text-primary">
          Your account was created. Check your email to confirm your address,
          then come back here to log in.
        </div>
      ) : null}

      {!isSupabaseConfigured ? (
        <div className="mt-6 rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-4 text-sm text-amber-700">
          Supabase credentials are not configured, so this form runs in preview
          mode and sends you to a role dashboard with demo data.
        </div>
      ) : null}

      <form className="mt-8 space-y-4" onSubmit={handleEmailLogin}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <Input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@university.edu.gh"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Password</label>
          <Input
            type="password"
            required={isSupabaseConfigured}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {!isSupabaseConfigured ? (
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Preview role
            </label>
            <Select
              value={previewRole}
              onChange={(event) => setPreviewRole(event.target.value as UserRole)}
            >
              <option value="student">Student</option>
              <option value="university_admin">University Admin</option>
              <option value="employer">Employer</option>
              <option value="super_admin">Super Admin</option>
            </Select>
          </div>
        ) : null}

        {error ? <p className="text-sm text-error">{error}</p> : null}

        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Log in
          {!loading ? <ArrowRight className="ml-2 h-4 w-4" /> : null}
        </Button>
      </form>

      <p className="mt-6 text-sm text-slate-500">
        No account yet?{" "}
        <Link href="/signup" className="font-semibold text-primary">
          Create one
        </Link>
      </p>
    </Card>
  );
}
