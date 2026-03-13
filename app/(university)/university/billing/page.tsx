import { SUBSCRIPTION_PRICING } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function UniversityBillingPage() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="License management"
        description="Monitor seat consumption, renewal timing, billing cycle, and per-seat pricing tiers."
      />
      <Card className="p-6">
        <div className="grid gap-4 xl:grid-cols-3">
          {SUBSCRIPTION_PRICING.university.map((plan) => (
            <div key={plan.tier} className="rounded-2xl border border-border p-5">
              <h2 className="text-2xl">{plan.tier}</h2>
              <p className="mt-2 text-sm text-slate-500">{plan.description}</p>
              <p className="mt-4 font-mono text-3xl text-primary">
                ${plan.pricePerSeat}
              </p>
              <p className="mt-1 text-sm text-slate-500">per student / semester</p>
            </div>
          ))}
        </div>
        <Button className="mt-6">Purchase more seats</Button>
      </Card>
    </div>
  );
}
