import { SUPER_ADMIN_NAV_ITEMS } from "@/lib/constants";
import { enforceRole } from "@/lib/auth";
import { RoleShell } from "@/components/shared/role-shell";

export default async function SuperAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await enforceRole(["super_admin"]);

  return (
    <RoleShell
      items={SUPER_ADMIN_NAV_ITEMS}
      roleLabel="Super Admin"
      name={auth.user?.email ?? "Super Admin"}
      preview={auth.preview}
    >
      {children}
    </RoleShell>
  );
}
