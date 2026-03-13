import Anthropic from "@anthropic-ai/sdk";
import { env, isAnthropicConfigured } from "@/lib/env";

let anthropicClient: Anthropic | null | undefined;

export function createAnthropicClient() {
  if (!isAnthropicConfigured) return null;

  if (!anthropicClient) {
    anthropicClient = new Anthropic({
      apiKey: env.ANTHROPIC_API_KEY,
    });
  }

  return anthropicClient;
}

export const CAREERBRIDGE_MODEL = "claude-sonnet-4-20250514";
