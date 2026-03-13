import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ROLE_HOME } from "@/lib/constants";
import type { UserRole } from "@/types/app";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const nextParam = url.searchParams.get("next");
  const next = nextParam?.startsWith("/") ? nextParam : "/dashboard";
  const redirectUrl = new URL(next, url.origin);

  const supabase = createSupabaseServerClient();

  if (!supabase || !code) {
    return NextResponse.redirect(redirectUrl);
  }

  await supabase.auth.exchangeCodeForSession(code);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const role = ((user?.user_metadata?.role as UserRole | undefined) ??
    "student") as UserRole;

  const response = NextResponse.redirect(
    new URL(next === "/dashboard" ? ROLE_HOME[role] : next, url.origin),
  );
  response.cookies.set("careerbridge-role", role, {
    path: "/",
    httpOnly: false,
  });

  return response;
}
