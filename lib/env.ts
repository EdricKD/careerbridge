const requiredPublicEnv = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
};

export const env = {
  ...requiredPublicEnv,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
};

export const isSupabaseConfigured = Boolean(
  env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export const isAnthropicConfigured = Boolean(env.ANTHROPIC_API_KEY);
export const isStripeConfigured = Boolean(
  env.STRIPE_SECRET_KEY &&
    env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY &&
    env.STRIPE_WEBHOOK_SECRET,
);
export const isResendConfigured = Boolean(env.RESEND_API_KEY);

export function getRequiredEnvValue(key: keyof typeof env) {
  const value = env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export function getAppUrl() {
  return env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}
