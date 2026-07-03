import type { Advisor } from "@/types";
import type { AdvisorRow } from "@/lib/supabase";
import { createServerSupabase } from "@/lib/supabase-server";
import { withQueryTimeout } from "@/lib/supabase-timeout";
import { ADVISOR as STATIC_ADVISOR } from "@/lib/services";

export function rowToAdvisor(row: AdvisorRow): Advisor {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    photo: row.photo ?? STATIC_ADVISOR.photo,
    whatsappNumber: row.whatsapp_number || STATIC_ADVISOR.whatsappNumber,
    languages:
      row.languages?.length ? row.languages : STATIC_ADVISOR.languages,
  };
}

/** All advisors ordered by created_at ascending. */
export async function getAllAdvisors(): Promise<Advisor[]> {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("advisors")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) throw error;
    return (data ?? []).map(rowToAdvisor);
  } catch {
    return [];
  }
}

export async function getAdvisorById(id: string): Promise<Advisor | null> {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("advisors")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error || !data) return null;
    return rowToAdvisor(data);
  } catch {
    return null;
  }
}

/**
 * Returns the first active advisor from the DB.
 * Falls back to the static ADVISOR constant if the table is empty or
 * the DB is unreachable — so the site always shows something.
 */
export async function getPrimaryAdvisor(): Promise<Advisor> {
  return withQueryTimeout(fetchPrimaryAdvisor(), STATIC_ADVISOR);
}

async function fetchPrimaryAdvisor(): Promise<Advisor> {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("advisors")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (error || !data) return STATIC_ADVISOR;
    return rowToAdvisor(data);
  } catch {
    return STATIC_ADVISOR;
  }
}
