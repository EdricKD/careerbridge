import { BarChart3, BriefcaseBusiness, UserCheck, Users } from "lucide-react";
import { demoEmployerStats } from "@/lib/demo-data";
import { MetricCard } from "@/components/shared/metric-card";
import { SectionHeading } from "@/components/shared/section-heading";

export default function EmployerDashboardPage() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="Employer overview"
        description="Track listing performance, applicant flow, and the quality of student engagement across your shadowing programs."
      />
      <div className="grid gap-6 xl:grid-cols-4">
        <MetricCard {...demoEmployerStats[0]} icon={<BriefcaseBusiness className="h-5 w-5" />} />
        <MetricCard {...demoEmployerStats[1]} icon={<Users className="h-5 w-5" />} />
        <MetricCard {...demoEmployerStats[2]} icon={<UserCheck className="h-5 w-5" />} />
        <MetricCard {...demoEmployerStats[3]} icon={<BarChart3 className="h-5 w-5" />} />
      </div>
    </div>
  );
}
