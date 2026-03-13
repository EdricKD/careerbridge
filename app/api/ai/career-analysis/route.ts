import { NextResponse } from "next/server";
import { generateCareerAnalysis } from "@/lib/ai/career-analysis";
import { requireApiRole } from "@/lib/api";
import { demoStudentProfile } from "@/lib/demo-data";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST() {
  const authResult = await requireApiRole(["student", "super_admin"]);

  if ("error" in authResult) {
    return authResult.error;
  }

  const analysis = await generateCareerAnalysis(demoStudentProfile);
  const supabaseAdmin = createSupabaseAdminClient();

  if (supabaseAdmin && !authResult.preview && authResult.auth.user?.id) {
    await supabaseAdmin.from("career_analyses").insert({
      student_id: authResult.auth.user.id,
      summary: analysis.summary,
      career_paths: analysis.careerPaths,
      skill_gaps: analysis.careerPaths.map((path) => ({
        name: path.name,
        gaps: path.skillGaps,
      })),
      compatibility_scores: analysis.careerPaths.map((path) => ({
        name: path.name,
        score: path.compatibilityScore,
      })),
      recommendations: analysis.careerPaths.map((path) => ({
        name: path.name,
        actions: path.recommendedActions,
      })),
    });
  }

  return NextResponse.json({ ok: true, analysis });
}
