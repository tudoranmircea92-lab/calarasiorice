import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const hasSupabase = Boolean(url && key);

export const getServerSupabase = () => {
  if (!url || !key) return null;
  const cookieStore = cookies();
  return createServerClient(url, key, {
    cookies: {
      get: (name: string) => cookieStore.get(name)?.value,
      set: (name: string, value: string, options: Record<string, unknown>) => {
        cookieStore.set({ name, value, ...options });
      },
      remove: (name: string, options: Record<string, unknown>) => {
        cookieStore.set({ name, value: "", ...options });
      }
    }
  });
};

export const getBrowserSupabase = () => {
  if (!url || !key) throw new Error("Supabase not configured");
  return createBrowserClient(url, key);
};
