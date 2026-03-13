import { Search } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { NotificationsBell } from "@/components/shared/notifications-bell";

type TopbarProps = {
  name: string;
  roleLabel: string;
  preview?: boolean;
};

export function Topbar({ name, roleLabel, preview }: TopbarProps) {
  return (
    <div className="surface-card flex flex-col gap-4 rounded-[28px] p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="relative hidden w-80 sm:block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            className="pl-10"
            placeholder="Search opportunities, students, mentors, or reports"
            aria-label="Search platform"
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 sm:justify-end">
        {preview ? (
          <div className="rounded-full border border-dashed border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            Preview mode
          </div>
        ) : null}
        <NotificationsBell />
        <div className="flex items-center gap-3 rounded-full border border-border bg-white px-2 py-2 pr-4">
          <Avatar name={name} />
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-900">{name}</p>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              {roleLabel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
