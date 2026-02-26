import { demoBusinesses, demoCategories, demoReviews } from "@/lib/demo-data";
import { getServerSupabase, hasSupabase } from "@/lib/supabase";

export async function getCategories() {
  if (!hasSupabase) return demoCategories;
  const supabase = getServerSupabase();
  if (!supabase) return demoCategories;
  const { data } = await supabase.from("categories").select("*").order("name");
  return data ?? demoCategories;
}

export async function getFeaturedBusinesses() {
  if (!hasSupabase) return demoBusinesses.filter((b) => b.is_featured).slice(0, 3);
  const supabase = getServerSupabase();
  if (!supabase) return demoBusinesses.slice(0, 3);
  const { data } = await supabase
    .from("businesses")
    .select("*, categories(*), business_images(*)")
    .eq("is_featured", true)
    .limit(3);
  return data ?? demoBusinesses.slice(0, 3);
}

export async function getBusinessesByCategory(slug: string) {
  if (!hasSupabase) return demoBusinesses.filter((b) => b.categories?.slug === slug);
  const supabase = getServerSupabase();
  if (!supabase) return [];
  const { data } = await supabase
    .from("businesses")
    .select("*, categories(*), business_images(*)")
    .eq("categories.slug", slug);
  return data ?? [];
}

export async function getBusinessBySlug(slug: string) {
  if (!hasSupabase) return demoBusinesses.find((b) => b.slug === slug) ?? null;
  const supabase = getServerSupabase();
  if (!supabase) return null;
  const { data } = await supabase
    .from("businesses")
    .select("*, categories(*), business_images(*)")
    .eq("slug", slug)
    .single();
  return data;
}

export async function getApprovedReviews(businessId: string) {
  if (!hasSupabase) return demoReviews.filter((r) => r.business_id === businessId);
  const supabase = getServerSupabase();
  if (!supabase) return [];
  const { data } = await supabase.from("reviews").select("*").eq("business_id", businessId).eq("status", "approved");
  return data ?? [];
}
