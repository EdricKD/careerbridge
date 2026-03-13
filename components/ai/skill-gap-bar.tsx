import { Progress } from "@/components/ui/progress";

type SkillGapBarProps = {
  skill: string;
  current: number;
  target: number;
};

export function SkillGapBar({ skill, current, target }: SkillGapBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">{skill}</span>
        <span className="font-mono text-slate-400">
          {current}% / {target}%
        </span>
      </div>
      <Progress value={current} className="h-2.5" />
      <Progress
        value={target}
        className="h-1.5 bg-amber-100"
        indicatorClassName="bg-accent"
      />
    </div>
  );
}
