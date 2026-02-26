import { createClient } from "@supabase/supabase-js";
import { demoBusinesses, demoCategories, demoReviews } from "../lib/demo-data";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) throw new Error("Missing Supabase env vars.");

const supabase = createClient(url, key);

async function run() {
  await supabase.from("reviews").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("business_images").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("businesses").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("categories").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  const { data: categories } = await supabase.from("categories").insert(
    demoCategories.map((c) => ({ name: c.name, slug: c.slug, icon: c.icon }))
  ).select();

  if (!categories) throw new Error("Category insert failed");

  const map = new Map(categories.map((c) => [c.slug, c.id]));
  const { data: businesses } = await supabase.from("businesses").insert(
    demoBusinesses.map((b) => ({
      name: b.name,
      slug: b.slug,
      category_id: map.get(b.categories!.slug),
      short_description: b.short_description,
      full_description: b.full_description,
      phone: b.phone,
      whatsapp: b.whatsapp,
      address: b.address,
      neighborhood: b.neighborhood,
      hours_json: b.hours_json,
      price_level: b.price_level,
      is_featured: b.is_featured,
      rating_average: b.rating_average,
      review_count: b.review_count
    }))
  ).select();

  if (!businesses) throw new Error("Business insert failed");
  await supabase.from("business_images").insert(
    businesses.map((b) => ({ business_id: b.id, image_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80", sort_order: 0 }))
  );

  await supabase.from("reviews").insert(
    demoReviews.map((r) => ({
      business_id: businesses[0].id,
      author_name: r.author_name,
      rating: r.rating,
      text: r.text,
      status: "approved"
    }))
  );

  console.log("Seed completed with demo-safe content.");
}

run();
