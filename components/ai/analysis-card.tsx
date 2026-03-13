import type { CareerPath } from "@/types/app";
import { Card } from "@/components/ui/card";
import { SkillGapBar } from "@/components/ai/skill-gap-bar";

type AnalysisCardProps = {
  path: CareerPath;
};

export function AnalysisCard({ path }: AnalysisCardProps) {
  return (
    <Card className="p-6">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-400">
        Compatibility {path.compatibilityScore}%
      </p>
      <h3 className="mt-3 text-2xl">{path.name}</h3>
      <p className="mt-3 text-sm leading-7">{path.description}</p>
      <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
        {path.whyItFits}
      </p>
      <div className="mt-5 space-y-4">
        {path.skillGaps.map((gap) => (
          <SkillGapBar key={gap.skill} {...gap} />
        ))}
      </div>
      <div className="mt-5 space-y-2">
        {path.recommendedActions.map((action) => (
          <div
            key={action}
            className="rounded-2xl border border-border bg-white px-4 py-3 text-sm text-slate-600"
          >
            {action}
          </div>
        ))}
      </div>
    </Card>
  );
}
