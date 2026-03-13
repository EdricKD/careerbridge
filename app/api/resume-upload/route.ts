import { NextResponse } from "next/server";
import { requireApiRole } from "@/lib/api";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { extractResumeText } from "@/lib/uploads/extract-text";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const authResult = await requireApiRole(["student", "super_admin"]);

  if ("error" in authResult) {
    return authResult.error;
  }

  const formData = await request.formData();
  const resume = formData.get("resume");

  if (!(resume instanceof File)) {
    return NextResponse.json({ error: "Resume file is required" }, { status: 400 });
  }

  const resumeText = await extractResumeText(resume);
  let resumeUrl: string | null = null;
  const supabaseAdmin = createSupabaseAdminClient();

  if (supabaseAdmin && !authResult.preview && authResult.auth.user?.id) {
    const filePath = `${authResult.auth.user.id}/${Date.now()}-${resume.name}`;
    const upload = await supabaseAdmin.storage.from("resumes").upload(filePath, resume, {
      contentType: resume.type,
      upsert: true,
    });

    if (!upload.error) {
      resumeUrl = filePath;

      await supabaseAdmin
        .from("student_profiles")
        .update({
          resume_url: filePath,
          resume_text: resumeText,
        })
        .eq("user_id", authResult.auth.user.id);
    }
  }

  return NextResponse.json({ ok: true, resumeText, resumeUrl });
}
