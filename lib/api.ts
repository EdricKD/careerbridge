import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import type { UserRole } from "@/types/app";

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function requireApiRole(roles?: UserRole[]) {
  const auth = await getAuthContext();

  if (auth.preview) {
    return { auth, preview: true } as const;
  }

  if (!auth.user) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    } as const;
  }

  if (roles && (!auth.role || !roles.includes(auth.role))) {
    return {
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    } as const;
  }

  return { auth, preview: false } as const;
}
