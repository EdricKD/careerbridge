import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const universities = [
  { name: "University of Ghana", license: "Growth", status: "Active" },
  { name: "KNUST", license: "Growth", status: "Pending renewal" },
  { name: "UCC", license: "Starter", status: "Active" },
];

export default function SuperAdminUniversitiesPage() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="University management"
        description="Approve, suspend, edit license terms, and monitor seat usage across every partner institution."
      />
      <div className="space-y-4">
        {universities.map((university) => (
          <Card key={university.name} className="p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl">{university.name}</h2>
                <p className="mt-2 text-sm text-slate-500">
                  {university.license} license · {university.status}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm">Approve</Button>
                <Button size="sm" variant="outline">
                  Suspend
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
