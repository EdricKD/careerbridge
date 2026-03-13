import { Database, DollarSign, Globe, Users } from "lucide-react";
import { demoSuperAdminCharts, demoSuperAdminSummary } from "@/lib/demo-data";
import { CareerInterestChart } from "@/components/charts/career-interest-chart";
import { EngagementChart } from "@/components/charts/engagement-chart";
import { MetricCard } from "@/components/shared/metric-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export default function SuperAdminOverviewPage() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="Platform overview"
        description="Monitor revenue, growth, adoption, employers, universities, and operational usage across the full CareerBridge network."
      />
      <div className="grid gap-6 xl:grid-cols-4">
        <MetricCard label="Total users" value={`${demoSuperAdminSummary.totalUsers}`} icon={<Users className="h-5 w-5" />} />
        <MetricCard label="Universities" value={`${demoSuperAdminSummary.totalUniversities}`} icon={<Globe className="h-5 w-5" />} />
        <MetricCard label="Employers" value={`${demoSuperAdminSummary.totalEmployers}`} icon={<Database className="h-5 w-5" />} />
        <MetricCard label="MRR" value={formatCurrency(demoSuperAdminSummary.monthlyRecurringRevenue)} icon={<DollarSign className="h-5 w-5" />} />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-2xl">Growth and subscriptions</h2>
          <EngagementChart data={demoSuperAdminCharts.growth} />
        </Card>
        <Card className="p-6">
          <h2 className="text-2xl">Top universities</h2>
          <CareerInterestChart data={demoSuperAdminCharts.topUniversities} />
        </Card>
      </div>
    </div>
  );
}
