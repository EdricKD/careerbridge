import Link from "next/link";
import { Compass } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-soft">
        <Compass className="h-5 w-5" />
      </div>
      <div>
        <p className="font-display text-lg leading-none text-slate-900">
          CareerBridge
        </p>
        <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-500">
          Ghana
        </p>
      </div>
    </Link>
  );
}
