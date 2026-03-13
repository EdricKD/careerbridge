import { NextResponse } from "next/server";
import { requireApiRole } from "@/lib/api";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const authResult = await requireApiRole();

  if ("error" in authResult) {
    return authResult.error;
  }

  const json = await request.json().catch(() => ({}));
  const notificationId = json.notificationId as string | undefined;
  const supabaseAdmin = createSupabaseAdminClient();

  if (supabaseAdmin && !authResult.preview && authResult.auth.user?.id) {
    const query = supabaseAdmin
      .from("notifications")
      .update({ read: true })
      .eq("user_id", authResult.auth.user.id);

    if (notificationId) {
      await query.eq("id", notificationId);
    } else {
      await query;
    }
  }

  return NextResponse.json({ ok: true });
}
