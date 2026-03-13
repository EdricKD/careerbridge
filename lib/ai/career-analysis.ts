import { z } from "zod";
import { createAnthropicClient, CAREERBRIDGE_MODEL } from "@/lib/ai/client";
import {
  buildCareerAnalysisSystemPrompt,
  buildCareerAnalysisUserPrompt,
} from "@/lib/ai/prompts";
import { demoAnalyses } from "@/lib/demo-data";
import { safeJsonParse } from "@/lib/utils";
import type { CareerAnalysisRecord, StudentProfile } from "@/types/app";

const analysisResponseSchema = z.object({
  summary: z.string(),
  career_paths: z.array(
    z.object({
      name: z.string(),
      compatibility_score: z.number().min(0).max(100),
      description: z.string(),
      why_it_fits: z.string(),
      skill_gaps: z.array(
        z.object({
          skill: z.string(),
          current: z.number().min(0).max(100),
          target: z.number().min(0).max(100),
        }),
      ),
      recommended_actions: z.array(z.string()).min(1),
    }),
  ),
});

function extractText(content: Array<{ type: string; text?: string }>) {
  return content.map((block) => block.text ?? "").join("\n").trim();
}

export async function generateCareerAnalysis(
  profile: StudentProfile,
): Promise<CareerAnalysisRecord> {
  const anthropic = createAnthropicClient();

  if (!anthropic) {
    return demoAnalyses[0];
  }

  const response = await anthropic.messages.create({
    model: CAREERBRIDGE_MODEL,
    max_tokens: 1800,
    system: buildCareerAnalysisSystemPrompt(),
    messages: [
      {
        role: "user",
        content: buildCareerAnalysisUserPrompt(profile),
      },
    ],
  });

  const parsed = analysisResponseSchema.parse(
    safeJsonParse(extractText(response.content as Array<{ type: string; text?: string }>), {}),
  );

  return {
    id: crypto.randomUUID(),
    generatedAt: new Date().toISOString(),
    summary: parsed.summary,
    careerPaths: parsed.career_paths.map((path) => ({
      name: path.name,
      compatibilityScore: path.compatibility_score,
      description: path.description,
      whyItFits: path.why_it_fits,
      skillGaps: path.skill_gaps,
      recommendedActions: path.recommended_actions,
    })),
  };
}
