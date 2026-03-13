import { demoBroadcasts, demoPartnerCompanies } from "@/lib/demo-data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function UniversityPartnershipsPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <div className="space-y-6">
        <SectionHeading
          title="Company partnerships"
          description="Approve, review, and request employer visibility for your students."
          action={<Button>Request company</Button>}
        />
        <div className="space-y-4">
          {demoPartnerCompanies.map((company) => (
            <Card key={company.id} className="p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl">{company.name}</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {company.industry} · {company.location}
                  </p>
                </div>
                <Badge
                  variant={
                    company.status === "approved"
                      ? "success"
                      : company.status === "pending"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {company.status}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Card className="p-6">
        <h2 className="text-2xl">Broadcast messaging</h2>
        <div className="mt-5 space-y-3">
          {demoBroadcasts.map((broadcast) => (
            <div key={broadcast.id} className="rounded-2xl border border-border p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="font-semibold text-slate-900">{broadcast.title}</p>
                <Badge variant={broadcast.status === "sent" ? "success" : "outline"}>
                  {broadcast.status}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                {broadcast.audience} · {broadcast.scheduledFor}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
