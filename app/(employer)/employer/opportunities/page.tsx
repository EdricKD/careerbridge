import { demoEmployerListings } from "@/lib/demo-data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EmployerOpportunitiesPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <Card className="p-6">
        <SectionHeading
          title="Post shadowing opportunity"
          description="Create a production-ready listing with skill focus, dates, spots, and location."
        />
        <div className="mt-6 grid gap-4">
          <Input placeholder="Opportunity title" />
          <Input placeholder="Industry" />
          <Input placeholder="Location" />
          <Textarea placeholder="Describe the opportunity, what students will learn, and how the experience is structured." />
          <Button>Create listing</Button>
        </div>
      </Card>
      <div className="space-y-6">
        <SectionHeading
          title="Manage listings"
          description="Edit, pause, close, and watch application movement across active opportunities."
        />
        {demoEmployerListings.map((listing) => (
          <Card key={listing.id} className="p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl">{listing.title}</h2>
                <p className="mt-2 text-sm text-slate-500">
                  {listing.views} views · {listing.applications} applications ·{" "}
                  {listing.spotsRemaining} spots remaining
                </p>
              </div>
              <Badge variant={listing.status === "open" ? "success" : "outline"}>
                {listing.status}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
