import { createClient } from "@supabase/supabase-js";
import { env, isSupabaseConfigured } from "@/lib/env";
import type { Database } from "@/types/supabase";

let adminClient:
  | ReturnType<typeof createClient<Database>>
  | null
  | undefined;

export function createSupabaseAdminClient() {
  if (!isSupabaseConfigured || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }

  if (!adminClient) {
    adminClient = createClient<Database>(
      env.NEXT_PUBLIC_SUPABASE_URL!,
      env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );
  }

  return adminClient;
}
