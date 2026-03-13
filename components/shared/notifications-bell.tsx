"use client";

import { useMemo, useState } from "react";
import { Bell } from "lucide-react";
import { demoNotifications } from "@/lib/demo-data";
import { formatRelativeDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const unreadCount = useMemo(
    () => demoNotifications.filter((item) => !item.read).length,
    [],
  );

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen((current) => !current)}
        aria-label="Open notifications"
      >
        <Bell className="h-4 w-4" />
      </Button>
      {unreadCount ? (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-slate-900">
          {unreadCount}
        </span>
      ) : null}

      {open ? (
        <Card className="absolute right-0 z-40 mt-3 w-[340px] p-3">
          <div className="mb-2 flex items-center justify-between px-2 py-1">
            <p className="text-sm font-semibold text-slate-900">Notifications</p>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              {unreadCount} unread
            </p>
          </div>
          <div className="space-y-2">
            {demoNotifications.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-border bg-slate-50/70 p-3"
              >
                <p className="text-sm leading-6 text-slate-700">{item.message}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-slate-400">
                  {formatRelativeDate(item.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
