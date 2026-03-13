import { formatPercent } from "@/lib/utils";

type ProgressRingProps = {
  value: number;
  label: string;
};

export function ProgressRing({ value, label }: ProgressRingProps) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference - (Math.max(0, Math.min(100, value)) / 100) * circumference;

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-28 w-28">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="rgba(15, 23, 42, 0.08)"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#1B4332"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dash}
            fill="none"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-2xl font-semibold text-primary">
            {formatPercent(value)}
          </span>
          <span className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
            Progress
          </span>
        </div>
      </div>
      <div>
        <p className="text-sm text-slate-500">Target role</p>
        <p className="mt-2 text-xl text-slate-900">{label}</p>
      </div>
    </div>
  );
}
