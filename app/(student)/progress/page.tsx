import { LineChart, Sparkles, Trophy } from "lucide-react";
import { demoBadges, demoMicroTasks, demoStudentProfile } from "@/lib/demo-data";
import { MetricCard } from "@/components/shared/metric-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { XpBar } from "@/components/shared/xp-bar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="Progress & Gamification"
        description="Track XP, badge momentum, and the behavior signals that turn ambition into proof."
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <MetricCard label="Current level" value={demoStudentProfile.careerLevel} icon={<Trophy className="h-5 w-5" />} />
        <MetricCard label="XP earned" value={`${demoStudentProfile.xpPoints}`} icon={<Sparkles className="h-5 w-5" />} />
        <MetricCard label="Skills tracked" value={`${demoStudentProfile.skills.length}`} icon={<LineChart className="h-5 w-5" />} />
      </div>

      <Card className="p-6">
        <h2 className="text-2xl">Career level progression</h2>
        <div className="mt-5">
          <XpBar xp={demoStudentProfile.xpPoints} level={demoStudentProfile.careerLevel} />
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card className="p-6">
          <h2 className="text-2xl">Badge collection</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {demoBadges.map((badge) => (
              <div
                key={badge.id}
                className={`rounded-2xl border p-4 ${badge.earned ? "border-primary/20 bg-primary/5" : "border-border bg-white"}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg">{badge.name}</h3>
                  <Badge variant={badge.earned ? "success" : "outline"}>
                    {badge.earned ? "Earned" : "Locked"}
                  </Badge>
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl">Micro-task history</h2>
          <div className="mt-5 space-y-3">
            {demoMicroTasks.map((task) => (
              <div key={task.id} className="rounded-2xl border border-border p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-slate-900">{task.title}</p>
                  <Badge variant="outline">{task.type}</Badge>
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {task.description}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
