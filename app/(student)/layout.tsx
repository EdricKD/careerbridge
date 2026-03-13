import { STUDENT_NAV_ITEMS } from "@/lib/constants";
import { enforceRole } from "@/lib/auth";
import { demoStudentProfile } from "@/lib/demo-data";
import { RoleShell } from "@/components/shared/role-shell";

export default async function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await enforceRole(["student"]);
  const name =
    auth.preview || !auth.user?.email
      ? demoStudentProfile.name
      : auth.user.email.split("@")[0].replace(/\./g, " ");

  return (
    <RoleShell
      items={STUDENT_NAV_ITEMS}
      roleLabel="Student"
      name={name}
      preview={auth.preview}
    >
      {children}
    </RoleShell>
  );
}
