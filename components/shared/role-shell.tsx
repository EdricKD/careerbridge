import type { NavItem } from "@/types/app";
import { PageTransition } from "@/components/shared/page-transition";
import { Sidebar } from "@/components/shared/sidebar";
import { Topbar } from "@/components/shared/topbar";

type RoleShellProps = {
  items: NavItem[];
  roleLabel: string;
  name: string;
  preview?: boolean;
  children: React.ReactNode;
};

export function RoleShell({
  items,
  roleLabel,
  name,
  preview,
  children,
}: RoleShellProps) {
  return (
    <div className="min-h-screen px-4 py-4 sm:px-6 lg:px-8">
      <div className="grid min-h-[calc(100vh-2rem)] gap-4 lg:grid-cols-[280px_1fr]">
        <Sidebar items={items} roleLabel={roleLabel} />
        <div className="space-y-4">
          <Topbar name={name} roleLabel={roleLabel} preview={preview} />
          <PageTransition>{children}</PageTransition>
        </div>
      </div>
    </div>
  );
}
