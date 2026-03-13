import {
  BriefcaseBusiness,
  CheckCircle2,
  MessageCircleMore,
  Sparkles,
} from "lucide-react";
import {
  demoAnalyses,
  demoApplications,
  demoMicroTasks,
  demoNotifications,
  demoOpportunities,
  demoStudentProfile,
} from "@/lib/demo-data";
import { getGreeting } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/section-heading";
import { MetricCard } from "@/components/shared/metric-card";
import { ProgressRing } from "@/components/shared/progress-ring";
import { XpBar } from "@/components/shared/xp-bar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title={`${getGreeting()}, ${demoStudentProfile.name.split(" ")[0]}`}
        description="Your companion has refreshed your momentum picture for today: what fits you best, what needs attention, and where the nearest opportunities are."
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-6">
          <p className="eyebrow">
            <Sparkles className="h-3.5 w-3.5" />
            AI Career Companion
          </p>
          <p className="mt-5 text-base leading-8 text-slate-700">
            {demoAnalyses[0].summary}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <MetricCard
              label="Applications sent"
              value={`${demoApplications.length}`}
              icon={<BriefcaseBusiness className="h-5 w-5" />}
            />
            <MetricCard
              label="Shadowing completed"
              value="1"
              icon={<CheckCircle2 className="h-5 w-5" />}
            />
            <MetricCard
              label="AI chats"
              value="8"
              icon={<MessageCircleMore className="h-5 w-5" />}
            />
          </div>
        </Card>

        <Card className="p-6">
          <ProgressRing
            value={demoStudentProfile.progressToTarget}
            label={demoStudentProfile.targetRole}
          />
          <div className="mt-6">
            <XpBar
              xp={demoStudentProfile.xpPoints}
              level={demoStudentProfile.careerLevel}
            />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr_0.9fr]">
        <Card className="p-6">
          <h2 className="text-2xl">Active micro-tasks</h2>
          <div className="mt-5 space-y-3">
            {demoMicroTasks.map((task) => (
              <div key={task.id} className="rounded-2xl border border-border p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-slate-900">{task.title}</p>
                  <Badge variant="outline">{task.type}</Badge>
                </div>
                <p className="mt-2 text-sm leading-7">{task.description}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl">Upcoming shadowing dates</h2>
          <div className="mt-5 space-y-3">
            {demoOpportunities.slice(0, 3).map((opportunity) => (
              <div key={opportunity.id} className="rounded-2xl border border-border p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">{opportunity.title}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {opportunity.companyName} · {opportunity.location}
                    </p>
                  </div>
                  <Badge variant="success">{opportunity.availableDates[0]}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl">Recent notifications</h2>
          <div className="mt-5 space-y-3">
            {demoNotifications.map((item) => (
              <div key={item.id} className="rounded-2xl border border-border p-4">
                <p className="text-sm leading-7 text-slate-700">{item.message}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
