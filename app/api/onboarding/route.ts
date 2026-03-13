import { NextResponse } from "next/server";
import { generateCareerAnalysis } from "@/lib/ai/career-analysis";
import { jsonError, requireApiRole } from "@/lib/api";
import { demoStudentProfile } from "@/lib/demo-data";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { extractResumeText } from "@/lib/uploads/extract-text";
import {
  onboardingEmployerSchema,
  onboardingStudentSchema,
  onboardingUniversitySchema,
} from "@/lib/validators";
import type { StudentProfile } from "@/types/app";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const authResult = await requireApiRole();

  if ("error" in authResult) {
    return authResult.error;
  }

  const contentType = request.headers.get("content-type") ?? "";
  const supabaseAdmin = createSupabaseAdminClient();
  const userId = authResult.preview
    ? demoStudentProfile.id
    : authResult.auth.user?.id ?? demoStudentProfile.id;
  const email = authResult.preview
    ? demoStudentProfile.email
    : authResult.auth.user?.email ?? demoStudentProfile.email;

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const resume = formData.get("resume");
    const parsed = onboardingStudentSchema.safeParse({
      role: formData.get("role"),
      name: formData.get("name"),
      universityName: formData.get("universityName"),
      degree: formData.get("degree"),
      major: formData.get("major"),
      yearOfStudy: formData.get("yearOfStudy"),
      bio: formData.get("bio"),
      skills: JSON.parse(String(formData.get("skills") ?? "[]")),
      careerInterests: JSON.parse(
        String(formData.get("careerInterests") ?? "[]"),
      ),
      personalityType: formData.get("personalityType"),
    });

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Invalid onboarding payload");
    }

    let resumeText = "";
    let resumeUrl: string | null = null;

    if (resume instanceof File && resume.size > 0) {
      resumeText = await extractResumeText(resume);

      if (supabaseAdmin) {
        const filePath = `${userId}/${Date.now()}-${resume.name}`;
        const upload = await supabaseAdmin.storage
          .from("resumes")
          .upload(filePath, resume, {
            contentType: resume.type,
            upsert: true,
          });

        if (!upload.error) {
          resumeUrl = filePath;
        }
      }
    }

    const profile: StudentProfile = {
      id: userId,
      email,
      name: parsed.data.name,
      universityName: parsed.data.universityName,
      degree: parsed.data.degree,
      major: parsed.data.major,
      yearOfStudy: parsed.data.yearOfStudy,
      bio: parsed.data.bio ?? "",
      careerInterests: parsed.data.careerInterests,
      skills: parsed.data.skills,
      personalityType: parsed.data.personalityType,
      careerLevel: "Freshman",
      xpPoints: 120,
      badges: [],
      resumeUrl,
      resumeText,
      subscriptionStatus: "active",
      progressToTarget: 35,
      targetRole: "Associate Product Manager",
    };

    const analysis = await generateCareerAnalysis(profile);

    if (supabaseAdmin && !authResult.preview) {
      await supabaseAdmin.from("users").upsert({
        id: userId,
        email,
        role: "student",
        subscription_status: "active",
      });

      let universityId: string | null = null;
      const existingUniversity = await supabaseAdmin
        .from("universities")
        .select("id")
        .ilike("name", parsed.data.universityName)
        .maybeSingle();
      const existingUniversityRow = existingUniversity.data as
        | { id?: string }
        | null;

      if (existingUniversityRow?.id) {
        universityId = existingUniversityRow.id;
      } else {
        const createdUniversity = await supabaseAdmin
          .from("universities")
          .insert({
            name: parsed.data.universityName,
            location: "Ghana",
            contact_email: `${parsed.data.universityName
              .replace(/\s+/g, "")
              .toLowerCase()}@careerbridgeghana.com`,
            license_type: "Starter",
            max_students: 500,
          })
          .select("id")
          .single();
        const createdUniversityRow = createdUniversity.data as
          | { id?: string }
          | null;

        universityId = createdUniversityRow?.id ?? null;
      }

      await supabaseAdmin.from("student_profiles").upsert({
        user_id: userId,
        name: parsed.data.name,
        university_id: universityId,
        degree: parsed.data.degree,
        major: parsed.data.major,
        year_of_study: parsed.data.yearOfStudy,
        bio: parsed.data.bio ?? "",
        resume_url: resumeUrl,
        resume_text: resumeText,
        career_interests: parsed.data.careerInterests,
        skills: parsed.data.skills,
        personality_type: parsed.data.personalityType,
        xp_points: 120,
      });

      await supabaseAdmin.from("career_analyses").insert({
        student_id: userId,
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

    return NextResponse.json({ ok: true, analysis, profile });
  }

  const json = await request.json();

  if (json.role === "employer") {
    const parsed = onboardingEmployerSchema.safeParse(json);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Invalid onboarding payload");
    }

    if (supabaseAdmin && !authResult.preview) {
      await supabaseAdmin.from("users").upsert({
        id: userId,
        email,
        role: "employer",
        subscription_status: "active",
      });

      await supabaseAdmin.from("employers").upsert({
        user_id: userId,
        company_name: parsed.data.companyName,
        industry: parsed.data.industry,
        location: parsed.data.location,
        website_url: parsed.data.website || null,
        description: parsed.data.description,
      });
    }

    return NextResponse.json({ ok: true, role: "employer" });
  }

  if (json.role === "university_admin") {
    const parsed = onboardingUniversitySchema.safeParse(json);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Invalid onboarding payload");
    }

    if (supabaseAdmin && !authResult.preview) {
      await supabaseAdmin.from("users").upsert({
        id: userId,
        email,
        role: "university_admin",
        subscription_status: "active",
      });

      const university = await supabaseAdmin
        .from("universities")
        .upsert({
          name: parsed.data.name,
          location: parsed.data.location,
          contact_email: parsed.data.contactEmail,
          license_type: parsed.data.licenseType,
          max_students: parsed.data.maxStudents,
        })
        .select("id")
        .single();
      const universityRow = university.data as { id?: string } | null;

      if (universityRow?.id) {
        await supabaseAdmin.from("university_admin_profiles").upsert({
          user_id: userId,
          university_id: universityRow.id,
        });
      }
    }

    return NextResponse.json({ ok: true, role: "university_admin" });
  }

  return jsonError("Unsupported onboarding role");
}
