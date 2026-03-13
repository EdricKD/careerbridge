"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Application, Opportunity } from "@/types/app";
import { OpportunityCard } from "@/components/student/opportunity-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";

type ShadowingMarketplaceProps = {
  opportunities: Opportunity[];
  applications: Application[];
};

export function ShadowingMarketplace({
  opportunities,
  applications,
}: ShadowingMarketplaceProps) {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("all");
  const [duration, setDuration] = useState("all");
  const [activeOpportunity, setActiveOpportunity] = useState<Opportunity | null>(null);
  const [applicationMessage, setApplicationMessage] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return opportunities.filter((opportunity) => {
      const matchesSearch =
        opportunity.title.toLowerCase().includes(search.toLowerCase()) ||
        opportunity.companyName.toLowerCase().includes(search.toLowerCase());
      const matchesIndustry =
        industry === "all" || opportunity.industry === industry;
      const matchesDuration =
        duration === "all" || opportunity.durationType === duration;
      return matchesSearch && matchesIndustry && matchesDuration;
    });
  }, [duration, industry, opportunities, search]);

  async function applyToOpportunity(opportunityId: string) {
    const response = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ opportunityId }),
    });

    const body = await response.json();
    setApplicationMessage(
      response.ok
        ? body.message ?? "Application submitted successfully."
        : body.error ?? "Unable to submit application.",
    );
  }

  const industries = Array.from(new Set(opportunities.map((item) => item.industry)));

  return (
    <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
      <Card className="h-fit p-6">
        <h2 className="text-2xl">Filter opportunities</h2>
        <div className="mt-5 space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-10"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search roles or companies"
            />
          </div>
          <Select value={industry} onChange={(event) => setIndustry(event.target.value)}>
            <option value="all">All industries</option>
            {industries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <Select value={duration} onChange={(event) => setDuration(event.target.value)}>
            <option value="all">All durations</option>
            <option value="1-day">1 day</option>
            <option value="1-week">1 week</option>
            <option value="virtual">Virtual</option>
          </Select>
        </div>

        <Card className="mt-6 p-4">
          <p className="text-sm font-semibold text-slate-900">My applications</p>
          <div className="mt-4 space-y-3">
            {applications.map((application) => (
              <div key={application.id} className="rounded-2xl border border-border p-4">
                <p className="font-medium text-slate-900">{application.opportunityTitle}</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm text-slate-500">{application.companyName}</p>
                  <Badge
                    variant={
                      application.status === "approved"
                        ? "success"
                        : application.status === "rejected"
                          ? "error"
                          : "outline"
                    }
                  >
                    {application.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Card>

      <div className="space-y-6">
        {applicationMessage ? (
          <Card className="border-success/20 bg-success/5 p-4">
            <p className="text-sm text-success">{applicationMessage}</p>
          </Card>
        ) : null}
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              onOpen={() => setActiveOpportunity(opportunity)}
            />
          ))}
        </div>
      </div>

      <Modal
        open={Boolean(activeOpportunity)}
        onOpenChange={(open) => {
          if (!open) setActiveOpportunity(null);
        }}
        title={activeOpportunity?.title ?? ""}
        description={activeOpportunity?.companyName}
      >
        {activeOpportunity ? (
          <div className="space-y-5">
            <p className="text-sm leading-7 text-slate-600">
              {activeOpportunity.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {activeOpportunity.skillsFocus.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">What students will learn</p>
              <div className="mt-3 space-y-2">
                {activeOpportunity.learningOutcomes.map((item) => (
                  <div key={item} className="rounded-2xl border border-border bg-white px-4 py-3 text-sm text-slate-600">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-3">
              <Button variant="outline" onClick={() => setActiveOpportunity(null)}>
                Close
              </Button>
              <Button onClick={() => applyToOpportunity(activeOpportunity.id)}>
                Apply now
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
