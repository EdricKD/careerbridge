import { NextResponse } from "next/server";
import { generateCareerCompanionReply } from "@/lib/ai/chat";
import { requireApiRole } from "@/lib/api";
import {
  demoAnalyses,
  demoApplications,
  demoChatMessages,
  demoStudentProfile,
} from "@/lib/demo-data";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { aiChatSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const authResult = await requireApiRole(["student", "super_admin"]);

  if ("error" in authResult) {
    return authResult.error;
  }

  const json = await request.json();
  const parsed = aiChatSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid message" },
      { status: 400 },
    );
  }

  const reply = await generateCareerCompanionReply({
    profile: demoStudentProfile,
    analyses: demoAnalyses,
    applications: demoApplications,
    history: demoChatMessages,
    message: parsed.data.message,
  });

  const supabaseAdmin = createSupabaseAdminClient();

  if (supabaseAdmin && !authResult.preview && authResult.auth.user?.id) {
    const messages = [
      ...demoChatMessages,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: parsed.data.message,
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: reply,
        createdAt: new Date().toISOString(),
      },
    ];

    await supabaseAdmin.from("ai_conversations").insert({
      student_id: authResult.auth.user.id,
      context_type: "chat",
      messages,
    });
  }

  return NextResponse.json({ ok: true, reply });
}
