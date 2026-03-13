import { NextResponse, type NextRequest } from "next/server";
import { defaultRolePath, getPathAccess } from "@/lib/access";
import { updateSupabaseSession } from "@/lib/supabase/middleware";
import { env, isSupabaseConfigured } from "@/lib/env";

export async function middleware(request: NextRequest) {
  const response = await updateSupabaseSession(request);

  if (!isSupabaseConfigured) {
    return response;
  }

  const pathname = request.nextUrl.pathname;
  const accessRule = getPathAccess(pathname);

  if (!accessRule) {
    return response;
  }

  const roleCookie = request.cookies.get("careerbridge-role")?.value as
    | keyof typeof defaultRolePath
    | undefined;

  if (!roleCookie && pathname !== "/login") {
    const loginUrl = new URL("/login", env.NEXT_PUBLIC_APP_URL ?? request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (
    roleCookie &&
    !accessRule.roles.includes(roleCookie) &&
    pathname !== defaultRolePath[roleCookie]
  ) {
    const redirectUrl = new URL(
      defaultRolePath[roleCookie],
      env.NEXT_PUBLIC_APP_URL ?? request.url,
    );
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/career-analysis/:path*",
    "/shadowing/:path*",
    "/chat/:path*",
    "/progress/:path*",
    "/mentorship/:path*",
    "/settings/:path*",
    "/university/:path*",
    "/employer/:path*",
    "/super-admin/:path*",
  ],
};
