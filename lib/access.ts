import type { UserRole } from "@/types/app";

export const roleProtectedPrefixes: Array<{
  prefix: string;
  roles: UserRole[];
}> = [
  { prefix: "/dashboard", roles: ["student"] },
  { prefix: "/career-analysis", roles: ["student"] },
  { prefix: "/shadowing", roles: ["student"] },
  { prefix: "/chat", roles: ["student"] },
  { prefix: "/progress", roles: ["student"] },
  { prefix: "/mentorship", roles: ["student"] },
  { prefix: "/settings", roles: ["student"] },
  { prefix: "/university", roles: ["university_admin", "super_admin"] },
  { prefix: "/employer", roles: ["employer", "super_admin"] },
  { prefix: "/super-admin", roles: ["super_admin"] },
];

export const defaultRolePath: Record<UserRole, string> = {
  student: "/dashboard",
  university_admin: "/university/admin",
  employer: "/employer/dashboard",
  super_admin: "/super-admin/overview",
};

export function getPathAccess(pathname: string) {
  return roleProtectedPrefixes.find(({ prefix }) => pathname.startsWith(prefix));
}
