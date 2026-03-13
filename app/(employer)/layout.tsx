import { EMPLOYER_NAV_ITEMS } from "@/lib/constants";
import { enforceRole } from "@/lib/auth";
import { RoleShell } from "@/components/shared/role-shell";

export default async function EmployerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await enforceRole(["employer", "super_admin"]);

  return (
    <RoleShell
      items={EMPLOYER_NAV_ITEMS}
      roleLabel="Employer"
      name={auth.user?.email ?? "Employer"}
      preview={auth.preview}
    >
      {children}
    </RoleShell>
  );
}
