import type { Stat } from "@/types/app";
import { Card } from "@/components/ui/card";

type MetricCardProps = Stat & {
  icon?: React.ReactNode;
};

export function MetricCard({ label, value, change, icon }: MetricCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-3 font-mono text-3xl font-semibold text-slate-900">
            {value}
          </p>
        </div>
        {icon ? (
          <div className="rounded-2xl bg-primary/8 p-3 text-primary">{icon}</div>
        ) : null}
      </div>
      {change ? (
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          {change}
        </p>
      ) : null}
    </Card>
  );
}
