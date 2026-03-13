import { Building2, ChartPie, Users } from "lucide-react";
import { demoUniversityStats } from "@/lib/demo-data";
import { MetricCard } from "@/components/shared/metric-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card } from "@/components/ui/card";

export default function UniversityAdminPage() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="University overview"
        description="Monitor activation, engagement, application movement, and partnership health across your student population."
      />
      <div className="grid gap-6 xl:grid-cols-4">
        <MetricCard {...demoUniversityStats[0]} icon={<Users className="h-5 w-5" />} />
        <MetricCard {...demoUniversityStats[1]} icon={<ChartPie className="h-5 w-5" />} />
        <MetricCard {...demoUniversityStats[2]} icon={<Building2 className="h-5 w-5" />} />
        <MetricCard {...demoUniversityStats[3]} icon={<Users className="h-5 w-5" />} />
      </div>
      <Card className="p-6">
        <h2 className="text-2xl">Admin priorities this week</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            "Invite remaining faculty coordinators and student ambassadors.",
            "Approve 2 pending employer partnerships for student visibility.",
            "Review the latest application trend report before semester billing closes.",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-border p-4 text-sm leading-7 text-slate-600">
              {item}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
