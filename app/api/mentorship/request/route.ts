import { NextResponse } from "next/server";
import { requireApiRole } from "@/lib/api";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { mentorRequestSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const authResult = await requireApiRole(["student", "super_admin"]);

  if ("error" in authResult) {
    return authResult.error;
  }

  const parsed = mentorRequestSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid mentor request" },
      { status: 400 },
    );
  }

  const supabaseAdmin = createSupabaseAdminClient();

  if (supabaseAdmin && !authResult.preview && authResult.auth.user?.id) {
    await supabaseAdmin.from("mentor_matches").insert({
      student_id: authResult.auth.user.id,
      mentor_id: parsed.data.mentorId,
      status: "requested",
      note: parsed.data.note ?? null,
    });

    await supabaseAdmin.from("notifications").insert({
      user_id: authResult.auth.user.id,
      type: "mentor_match",
      message: "Your mentorship request has been submitted.",
    });
  }

  return NextResponse.json({
    ok: true,
    message: "Mentor request submitted. You will be notified when a match is confirmed.",
  });
}
