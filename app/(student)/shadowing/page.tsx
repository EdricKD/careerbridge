import { demoApplications, demoOpportunities } from "@/lib/demo-data";
import { SectionHeading } from "@/components/shared/section-heading";
import { ShadowingMarketplace } from "@/components/student/shadowing-marketplace";

export default function ShadowingPage() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="Job Shadowing Marketplace"
        description="Search by industry, duration, and location to find experiences that fit your direction. This is built for applied learning, not passive browsing."
      />
      <ShadowingMarketplace
        opportunities={demoOpportunities}
        applications={demoApplications}
      />
    </div>
  );
}
