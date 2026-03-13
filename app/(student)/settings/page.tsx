import { CreditCard, ShieldCheck, UserRound } from "lucide-react";
import { demoStudentProfile } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <Card className="p-6">
        <div className="flex items-center gap-3">
          <UserRound className="h-5 w-5 text-primary" />
          <h1 className="text-3xl">Profile settings</h1>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border p-4">
            <p className="text-sm text-slate-500">Name</p>
            <p className="mt-2 text-lg text-slate-900">{demoStudentProfile.name}</p>
          </div>
          <div className="rounded-2xl border border-border p-4">
            <p className="text-sm text-slate-500">University</p>
            <p className="mt-2 text-lg text-slate-900">
              {demoStudentProfile.universityName}
            </p>
          </div>
          <div className="rounded-2xl border border-border p-4">
            <p className="text-sm text-slate-500">Degree</p>
            <p className="mt-2 text-lg text-slate-900">{demoStudentProfile.degree}</p>
          </div>
          <div className="rounded-2xl border border-border p-4">
            <p className="text-sm text-slate-500">Target role</p>
            <p className="mt-2 text-lg text-slate-900">
              {demoStudentProfile.targetRole}
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-primary" />
            <h2 className="text-2xl">Subscription</h2>
          </div>
          <div className="mt-5 flex items-center justify-between rounded-2xl border border-border p-4">
            <div>
              <p className="font-semibold text-slate-900">Student premium access</p>
              <p className="mt-2 text-sm text-slate-500">
                Active semester plan with AI analysis, chat, nudges, and premium shadowing access.
              </p>
            </div>
            <Badge variant="success">{demoStudentProfile.subscriptionStatus}</Badge>
          </div>
          <Button className="mt-5">Manage billing</Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h2 className="text-2xl">Security</h2>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-500">
            Password resets, Google OAuth, and role-enforced access sit behind
            Supabase Auth and database policies.
          </p>
        </Card>
      </div>
    </div>
  );
}
