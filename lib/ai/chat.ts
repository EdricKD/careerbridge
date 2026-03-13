import { createAnthropicClient, CAREERBRIDGE_MODEL } from "@/lib/ai/client";
import { buildCompanionSystemPrompt } from "@/lib/ai/prompts";
import type {
  Application,
  CareerAnalysisRecord,
  ChatMessage,
  StudentProfile,
} from "@/types/app";

export async function generateCareerCompanionReply(input: {
  profile: StudentProfile;
  analyses: CareerAnalysisRecord[];
  applications: Application[];
  history: ChatMessage[];
  message: string;
}) {
  const anthropic = createAnthropicClient();

  if (!anthropic) {
    return "You already have strong momentum. I would prioritize one shadowing opportunity that sharpens either product operations or analytics, then turn that experience into a short case study for your profile.";
  }

  const response = await anthropic.messages.create({
    model: CAREERBRIDGE_MODEL,
    max_tokens: 1000,
    system: buildCompanionSystemPrompt(input),
    messages: [
      ...input.history.slice(-20).map((message) => ({
        role: message.role,
        content: message.content,
      })),
      {
        role: "user" as const,
        content: input.message,
      },
    ],
  });

  return (response.content as Array<{ text?: string }>)
    .map((block) => block.text ?? "")
    .join("\n")
    .trim();
}
