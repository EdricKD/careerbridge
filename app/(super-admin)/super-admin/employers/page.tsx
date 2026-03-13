import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const employers = [
  { name: "Hubtel", status: "Awaiting verification", listings: 3 },
  { name: "Zeepay", status: "Verified", listings: 6 },
  { name: "Farmerline", status: "Verified", listings: 2 },
];

export default function SuperAdminEmployersPage() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="Employer verification"
        description="Approve new employer accounts, inspect listing quality, and moderate company visibility."
      />
      <div className="space-y-4">
        {employers.map((employer) => (
          <Card key={employer.name} className="p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl">{employer.name}</h2>
                <p className="mt-2 text-sm text-slate-500">
                  {employer.status} · {employer.listings} listings
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm">Approve</Button>
                <Button size="sm" variant="outline">
                  Reject
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
