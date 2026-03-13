"use client";

import { createBrowserClient } from "@supabase/ssr";
import { env, isSupabaseConfigured } from "@/lib/env";
import type { Database } from "@/types/supabase";

type BrowserSupabaseClient = ReturnType<typeof createBrowserClient<Database>>;

let browserClient: BrowserSupabaseClient | null = null;

export function createClient() {
  if (!isSupabaseConfigured) {
    return null;
  }

  if (!browserClient) {
    browserClient = createBrowserClient<Database>(
      env.NEXT_PUBLIC_SUPABASE_URL!,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }

  return browserClient;
}

export const createSupabaseBrowserClient = createClient;
