import { UNIVERSITY_NAV_ITEMS } from "@/lib/constants";
import { enforceRole } from "@/lib/auth";
import { RoleShell } from "@/components/shared/role-shell";

export default async function UniversityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await enforceRole(["university_admin", "super_admin"]);

  return (
    <RoleShell
      items={UNIVERSITY_NAV_ITEMS}
      roleLabel="University Admin"
      name={auth.user?.email ?? "University Admin"}
      preview={auth.preview}
    >
      {children}
    </RoleShell>
  );
}
