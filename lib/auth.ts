import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { defaultRolePath } from "@/lib/access";
import type { UserRole } from "@/types/app";

export type AuthContext = {
  user: {
    id: string;
    email?: string;
  } | null;
  role: UserRole | null;
  preview: boolean;
};

function normalizeRole(value: string | undefined): UserRole | null {
  if (
    value === "student" ||
    value === "university_admin" ||
    value === "employer" ||
    value === "super_admin"
  ) {
    return value;
  }

  return null;
}

export async function getAuthContext(): Promise<AuthContext> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return {
      user: null,
      role: null,
      preview: true,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      user: null,
      role: null,
      preview: false,
    };
  }

  const metadataRole = normalizeRole(
    (user.user_metadata?.role as string | undefined) ??
      (user.app_metadata?.role as string | undefined),
  );

  if (metadataRole) {
    return {
      user: {
        id: user.id,
        email: user.email,
      },
      role: metadataRole,
      preview: false,
    };
  }

  const { data } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  const userRow = data as { role?: string } | null;

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    role: normalizeRole(userRow?.role),
    preview: false,
  };
}

export async function enforceRole(requiredRoles: UserRole[]) {
  const auth = await getAuthContext();

  if (auth.preview) {
    return {
      ...auth,
      role: requiredRoles[0],
    };
  }

  if (!auth.user) {
    redirect("/login");
  }

  if (!auth.role || !requiredRoles.includes(auth.role)) {
    redirect(defaultRolePath[auth.role ?? requiredRoles[0]]);
  }

  return auth;
}

export function getRoleHomePath(role: UserRole) {
  return defaultRolePath[role];
}
