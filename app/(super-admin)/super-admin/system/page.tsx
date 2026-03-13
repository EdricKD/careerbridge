import { SectionHeading } from "@/components/shared/section-heading";
import { Card } from "@/components/ui/card";

export default function SuperAdminSystemPage() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="System health"
        description="High-level visibility into API usage, storage growth, billing health, and moderation posture."
      />
      <div className="grid gap-6 xl:grid-cols-3">
        {[
          {
            title: "API usage",
            description: "129,843 requests this month across AI, auth, opportunities, and billing endpoints.",
          },
          {
            title: "Storage",
            description: "312 GB used across resumes, company assets, and institutional files.",
          },
          {
            title: "Moderation queue",
            description: "4 listings flagged for review, 2 employer accounts awaiting compliance checks.",
          },
        ].map((item) => (
          <Card key={item.title} className="p-6">
            <h2 className="text-2xl">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
