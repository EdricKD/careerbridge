"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AnalysisCard } from "@/components/ai/analysis-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Application, CareerAnalysisRecord, ChatMessage, StudentProfile } from "@/types/app";

type CareerAnalysisWorkspaceProps = {
  profile: StudentProfile;
  analyses: CareerAnalysisRecord[];
  applications: Application[];
  history: ChatMessage[];
};

export function CareerAnalysisWorkspace({
  profile,
  analyses,
  applications,
  history,
}: CareerAnalysisWorkspaceProps) {
  const [analysisHistory, setAnalysisHistory] = useState(analyses);
  const [followUpQuestion, setFollowUpQuestion] = useState("");
  const [followUpResponse, setFollowUpResponse] = useState<string | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const latest = analysisHistory[0];

  async function regenerateAnalysis() {
    setLoadingAnalysis(true);

    try {
      const response = await fetch("/api/ai/career-analysis", {
        method: "POST",
      });
      const body = await response.json();
      if (response.ok && body.analysis) {
        setAnalysisHistory((current) => [body.analysis, ...current]);
      }
    } finally {
      setLoadingAnalysis(false);
    }
  }

  async function askFollowUp() {
    if (!followUpQuestion.trim()) return;

    setLoadingChat(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: followUpQuestion }),
      });
      const body = await response.json();
      if (response.ok) {
        setFollowUpResponse(body.reply);
        setFollowUpQuestion("");
      }
    } finally {
      setLoadingChat(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="eyebrow">Latest analysis</p>
            <h2 className="mt-4 text-3xl">AI Career Fit Analyzer</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
              Built from your skills, interests, personality, year of study,
              degree, resume content, and prior platform activity. Right now it
              is using {profile.skills.length} tracked skills, {applications.length}{" "}
              applications, and {history.length} recent companion messages.
            </p>
          </div>
          <Button onClick={regenerateAnalysis} disabled={loadingAnalysis}>
            {loadingAnalysis ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Regenerate analysis
          </Button>
        </div>

        <Card className="mt-6 border-primary/10 bg-primary/5 p-6">
          <p className="text-base leading-8 text-slate-700">{latest.summary}</p>
        </Card>
      </Card>

      <div className="grid gap-6 xl:grid-cols-3">
        {latest.careerPaths.map((path) => (
          <AnalysisCard key={path.name} path={path} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6">
          <h3 className="text-2xl">Ask a follow-up question</h3>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            The AI keeps your profile, past analyses, and application history in
            context while it answers.
          </p>
          <div className="mt-5 flex gap-3">
            <Input
              value={followUpQuestion}
              onChange={(event) => setFollowUpQuestion(event.target.value)}
              placeholder="What should I prioritize this semester?"
            />
            <Button onClick={askFollowUp} disabled={loadingChat}>
              {loadingChat ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ask"}
            </Button>
          </div>
          <Card className="mt-5 p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              AI response
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              {followUpResponse ??
                "Ask about shadowing, interview preparation, course choices, CV improvements, or how to close a specific skill gap."}
            </p>
          </Card>
        </Card>

        <Card className="p-6">
          <h3 className="text-2xl">Analysis history</h3>
          <div className="mt-5 space-y-3">
            {analysisHistory.map((entry) => (
              <div key={entry.id} className="rounded-2xl border border-border p-4">
                <p className="font-semibold text-slate-900">{entry.generatedAt}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {entry.summary}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
