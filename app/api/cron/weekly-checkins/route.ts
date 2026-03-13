import { NextResponse } from "next/server";
import { generateWeeklyCheckin } from "@/lib/ai/checkin";
import { demoStudentProfile } from "@/lib/demo-data";
import { renderWeeklyCheckinEmail } from "@/lib/resend/templates";
import { sendTransactionalEmail } from "@/lib/resend/send";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabaseAdmin = createSupabaseAdminClient();

  if (!supabaseAdmin) {
    const body = await generateWeeklyCheckin(demoStudentProfile);
    await sendTransactionalEmail({
      to: demoStudentProfile.email,
      subject: "Your weekly CareerBridge check-in",
      html: renderWeeklyCheckinEmail({
        studentName: demoStudentProfile.name.split(" ")[0],
        body,
      }),
    });

    return NextResponse.json({ ok: true, processed: 1, preview: true });
  }

  const sevenDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString();
  const { data } = await supabaseAdmin
    .from("users")
    .select("id, email, last_active_at")
    .eq("role", "student")
    .lt("last_active_at", sevenDaysAgo);

  const users = (data ?? []) as Array<{ id: string; email?: string }>;
  let processed = 0;

  for (const user of users) {
    const { data: profileData } = await supabaseAdmin
      .from("student_profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    const profile = profileData as
      | {
          name: string;
          degree: string;
          major: string;
          year_of_study: string;
          bio?: string;
          career_interests?: string[];
          skills?: string[];
          personality_type?: "Analytical" | "Creative" | "Leader" | "Builder" | "Connector" | "Investigator";
          career_level?: "Freshman" | "Explorer" | "Pathfinder" | "Navigator" | "Trailblazer" | "Pioneer";
          xp_points?: number;
          badges?: string[];
          resume_url?: string | null;
          resume_text?: string | null;
        }
      | null;

    if (!profile || !user.email) continue;

    const body = await generateWeeklyCheckin({
      id: user.id,
      email: user.email,
      name: profile.name,
      universityName: "University",
      degree: profile.degree,
      major: profile.major,
      yearOfStudy: profile.year_of_study,
      bio: profile.bio ?? "",
      careerInterests: profile.career_interests ?? [],
      skills: profile.skills ?? [],
      personalityType: profile.personality_type ?? "Connector",
      careerLevel: profile.career_level ?? "Freshman",
      xpPoints: profile.xp_points ?? 0,
      badges: profile.badges ?? [],
      progressToTarget: 50,
      subscriptionStatus: "active",
      targetRole: "Career goal",
      resumeUrl: profile.resume_url,
      resumeText: profile.resume_text,
    });

    await sendTransactionalEmail({
      to: user.email,
      subject: "Your weekly CareerBridge check-in",
      html: renderWeeklyCheckinEmail({
        studentName: profile.name.split(" ")[0],
        body,
      }),
    });

    processed += 1;
  }

  return NextResponse.json({ ok: true, processed });
}
