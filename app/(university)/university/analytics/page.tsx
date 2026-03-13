import {
  demoApplicationOutcomeChart,
  demoUniversityEngagementChart,
  demoUniversityInterestChart,
} from "@/lib/demo-data";
import { SectionHeading } from "@/components/shared/section-heading";
import { ApplicationOutcomesChart } from "@/components/charts/application-outcomes-chart";
import { CareerInterestChart } from "@/components/charts/career-interest-chart";
import { EngagementChart } from "@/components/charts/engagement-chart";
import { Card } from "@/components/ui/card";

export default function UniversityAnalyticsPage() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="University analytics"
        description="Track interest distribution, weekly engagement, and application outcomes with export-ready visuals."
      />
      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-2xl">Career interest distribution</h2>
          <CareerInterestChart data={demoUniversityInterestChart} />
        </Card>
        <Card className="p-6">
          <h2 className="text-2xl">Weekly engagement</h2>
          <EngagementChart data={demoUniversityEngagementChart} />
        </Card>
      </div>
      <Card className="p-6">
        <h2 className="text-2xl">Application outcomes</h2>
        <ApplicationOutcomesChart data={demoApplicationOutcomeChart} />
      </Card>
    </div>
  );
}
