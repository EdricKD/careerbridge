import { NextResponse } from "next/server";
import { requireApiRole } from "@/lib/api";
import { demoApplications } from "@/lib/demo-data";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { applicationSchema } from "@/lib/validators";

export async function GET() {
  return NextResponse.json({ applications: demoApplications });
}

export async function POST(request: Request) {
  const authResult = await requireApiRole(["student", "super_admin"]);

  if ("error" in authResult) {
    return authResult.error;
  }

  const parsed = applicationSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid application payload" },
      { status: 400 },
    );
  }

  const supabaseAdmin = createSupabaseAdminClient();

  if (supabaseAdmin && !authResult.preview && authResult.auth.user?.id) {
    await supabaseAdmin.from("applications").insert({
      student_id: authResult.auth.user.id,
      opportunity_id: parsed.data.opportunityId,
      status: "pending",
    });

    await supabaseAdmin.from("notifications").insert({
      user_id: authResult.auth.user.id,
      type: "application_update",
      message: "Your shadowing application was submitted successfully.",
    });
  }

  return NextResponse.json({
    ok: true,
    message:
      "Application submitted. You will receive a notification when the employer reviews it.",
  });
}

export async function PATCH(request: Request) {
  const authResult = await requireApiRole(["employer", "super_admin"]);

  if ("error" in authResult) {
    return authResult.error;
  }

  const { applicationId, status, employerNotes } = await request.json();

  if (!applicationId || !status) {
    return NextResponse.json(
      { error: "applicationId and status are required" },
      { status: 400 },
    );
  }

  const supabaseAdmin = createSupabaseAdminClient();

  if (supabaseAdmin) {
    const update = await supabaseAdmin
      .from("applications")
      .update({
        status,
        employer_notes: employerNotes ?? null,
      })
      .eq("id", applicationId)
      .select("student_id")
      .single();

    if (update.data?.student_id) {
      await supabaseAdmin.from("notifications").insert({
        user_id: update.data.student_id,
        type: "application_update",
        message: `Your application status changed to ${status}.`,
      });
    }
  }

  return NextResponse.json({ ok: true });
}
