import { getNextCareerLevelTarget } from "@/lib/utils";
import type { CareerLevel } from "@/types/app";
import { Progress } from "@/components/ui/progress";

type XpBarProps = {
  xp: number;
  level: CareerLevel;
};

export function XpBar({ xp, level }: XpBarProps) {
  const target = getNextCareerLevelTarget(level);
  const percent = Math.min(100, (xp / target) * 100);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
        <span>{level}</span>
        <span>{xp} XP</span>
      </div>
      <Progress value={percent} />
      <p className="mt-2 text-xs text-slate-500">
        {Math.max(target - xp, 0)} XP to reach the next milestone.
      </p>
    </div>
  );
}
