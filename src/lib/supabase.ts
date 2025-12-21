import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../types/supabase";

// =============================================================================
// Client-Side Supabase Client
// =============================================================================
// Uses VITE_ prefixed env vars (exposed to browser)
// Uses anon key with RLS for secure client-side access

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env.local file."
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// =============================================================================
// Server-Side Supabase Client
// =============================================================================
// Uses service role key for server functions (bypasses RLS)
// Only use in server functions, never expose to client

export function createServerClient() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing server-side Supabase environment variables. Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// =============================================================================
// Auth Helpers
// =============================================================================

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error getting session:", error.message);
    return null;
  }
  return data.session;
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error getting user:", error.message);
    return null;
  }
  return data.user;
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName?: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
        avatar_url: null,
      },
    },
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function updateUserMetadata(metadata: {
  display_name?: string;
  avatar_url?: string | null;
}) {
  const { data, error } = await supabase.auth.updateUser({
    data: metadata,
  });
  return { data, error };
}

// Helper to get user metadata
export function getUserDisplayName(user: { user_metadata?: { display_name?: string } } | null): string {
  return user?.user_metadata?.display_name || "User";
}

export function getUserAvatarUrl(user: { user_metadata?: { avatar_url?: string } } | null): string | null {
  return user?.user_metadata?.avatar_url || null;
}

export function onAuthStateChange(
  callback: (event: string, session: unknown) => void
) {
  return supabase.auth.onAuthStateChange(callback);
}

// =============================================================================
// Helper Types
// =============================================================================

export type Customer = Database["public"]["Tables"]["customers"]["Row"];
export type CustomerInsert = Database["public"]["Tables"]["customers"]["Insert"];
export type CustomerUpdate = Database["public"]["Tables"]["customers"]["Update"];
export type Meeting = Database["public"]["Tables"]["meetings"]["Row"];
export type MeetingInsert = Database["public"]["Tables"]["meetings"]["Insert"];
export type MeetingUpdate = Database["public"]["Tables"]["meetings"]["Update"];
