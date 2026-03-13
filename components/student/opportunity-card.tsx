import { CalendarDays, MapPin, TimerReset } from "lucide-react";
import type { Opportunity } from "@/types/app";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type OpportunityCardProps = {
  opportunity: Opportunity;
  onOpen: () => void;
};

export function OpportunityCard({
  opportunity,
  onOpen,
}: OpportunityCardProps) {
  return (
    <Card className="group overflow-hidden p-0 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="flex items-start gap-4 p-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={opportunity.companyLogo}
          alt={opportunity.companyName}
          className="h-14 w-14 rounded-2xl object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{opportunity.industry}</Badge>
            <Badge
              variant={
                opportunity.status === "open"
                  ? "success"
                  : opportunity.status === "paused"
                    ? "secondary"
                    : "outline"
              }
            >
              {opportunity.status}
            </Badge>
          </div>
          <h3 className="mt-3 text-xl">{opportunity.title}</h3>
          <p className="mt-1 text-sm font-medium text-slate-500">
            {opportunity.companyName}
          </p>
        </div>
      </div>
      <div className="border-t border-border bg-slate-50/70 p-5">
        <p className="text-sm leading-7">{opportunity.description}</p>
        <div className="mt-4 grid gap-2 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {opportunity.location}
          </div>
          <div className="flex items-center gap-2">
            <TimerReset className="h-4 w-4" />
            {opportunity.durationType}
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            {opportunity.spotsRemaining} of {opportunity.spotsTotal} spots left
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {opportunity.skillsFocus.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
        <Button className="mt-5 w-full" onClick={onOpen}>
          View opportunity
        </Button>
      </div>
    </Card>
  );
}
