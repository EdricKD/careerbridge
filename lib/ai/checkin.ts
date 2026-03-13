import { createAnthropicClient, CAREERBRIDGE_MODEL } from "@/lib/ai/client";
import { buildCheckinSystemPrompt } from "@/lib/ai/prompts";
import type { StudentProfile } from "@/types/app";

export async function generateWeeklyCheckin(profile: StudentProfile) {
  const anthropic = createAnthropicClient();

  if (!anthropic) {
    return `Hi ${profile.name.split(" ")[0]}, your product and analytics path is still building nicely. This week, try one concrete move: apply for a shadowing opportunity or refine one case study on your profile. A small step now will make your next opportunity feel much closer.`;
  }

  const response = await anthropic.messages.create({
    model: CAREERBRIDGE_MODEL,
    max_tokens: 250,
    system: buildCheckinSystemPrompt(profile),
    messages: [
      {
        role: "user",
        content: "Write the weekly re-engagement nudge email body.",
      },
    ],
  });

  return (response.content as Array<{ text?: string }>)
    .map((block) => block.text ?? "")
    .join("\n")
    .trim();
}
