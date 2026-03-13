import { NextResponse } from "next/server";
import { requireApiRole } from "@/lib/api";
import { demoOpportunities } from "@/lib/demo-data";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { opportunitySchema } from "@/lib/validators";

export async function GET() {
  return NextResponse.json({ opportunities: demoOpportunities });
}

export async function POST(request: Request) {
  const authResult = await requireApiRole(["employer", "super_admin"]);

  if ("error" in authResult) {
    return authResult.error;
  }

  const parsed = opportunitySchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid opportunity payload" },
      { status: 400 },
    );
  }

  const supabaseAdmin = createSupabaseAdminClient();

  if (supabaseAdmin && !authResult.preview && authResult.auth.user?.id) {
    const employer = await supabaseAdmin
      .from("employers")
      .select("id")
      .eq("user_id", authResult.auth.user.id)
      .single();

    if (!employer.data?.id) {
      return NextResponse.json(
        { error: "Employer record not found for current user" },
        { status: 404 },
      );
    }

    await supabaseAdmin.from("shadowing_opportunities").insert({
      employer_id: employer.data.id,
      title: parsed.data.title,
      description: parsed.data.description,
      industry: parsed.data.industry,
      location: parsed.data.location,
      duration_type: parsed.data.durationType,
      skills_focus: parsed.data.skillsFocus,
      available_dates: parsed.data.availableDates,
      spots_total: parsed.data.spotsTotal,
      spots_remaining: parsed.data.spotsTotal,
      status: "open",
    });
  }

  return NextResponse.json({
    ok: true,
    opportunity: {
      id: crypto.randomUUID(),
      ...parsed.data,
      status: "open",
    },
  });
}
