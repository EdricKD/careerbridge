"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseBusiness,
  Building2,
  ChartColumnBig,
  CreditCard,
  GraduationCap,
  Handshake,
  LayoutDashboard,
  MessageSquareText,
  Settings,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import type { NavItem } from "@/types/app";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { Badge } from "@/components/ui/badge";

type SidebarProps = {
  items: NavItem[];
  roleLabel: string;
};

export function Sidebar({ items, roleLabel }: SidebarProps) {
  const pathname = usePathname();
  const iconMap = {
    "briefcase-business": BriefcaseBusiness,
    "building-2": Building2,
    "chart-column-big": ChartColumnBig,
    "credit-card": CreditCard,
    "graduation-cap": GraduationCap,
    handshake: Handshake,
    "layout-dashboard": LayoutDashboard,
    "message-square-text": MessageSquareText,
    settings: Settings,
    "shield-check": ShieldCheck,
    sparkles: Sparkles,
    trophy: Trophy,
    users: Users,
  } as const;

  return (
    <aside className="surface-card hidden h-[calc(100vh-2rem)] flex-col rounded-[28px] p-5 lg:flex">
      <div className="border-b border-border pb-5">
        <Logo />
        <Badge variant="outline" className="mt-4">
          {roleLabel}
        </Badge>
      </div>
      <nav className="mt-6 flex-1 space-y-1">
        {items.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] ?? LayoutDashboard;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-primary text-white shadow-soft"
                  : "text-slate-600 hover:bg-slate-100",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>
      <div className="rounded-2xl bg-primary p-4 text-white">
        <p className="text-xs uppercase tracking-[0.22em] text-white/70">
          Momentum
        </p>
        <p className="mt-3 text-lg text-white">
          Small steps compound quickly when the system keeps remembering what
          matters.
        </p>
      </div>
    </aside>
  );
}
