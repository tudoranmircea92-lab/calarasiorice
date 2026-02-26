import { NextResponse } from "next/server";
import { getServerSupabase, hasSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.name || !body.phone) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  if (!hasSupabase) return NextResponse.json({ ok: true, mode: "demo" });
  const supabase = getServerSupabase();
  const { error } = await supabase!.from("businesses").insert({
    name: body.name,
    slug: body.name.toLowerCase().replace(/\s+/g, "-"),
    short_description: body.description,
    full_description: body.description,
    phone: body.phone,
    whatsapp: body.whatsapp,
    address: body.address,
    neighborhood: "Centru",
    hours_json: { mon: body.hours, tue: body.hours, wed: body.hours, thu: body.hours, fri: body.hours, sat: body.hours, sun: "closed" },
    price_level: 2,
    category_id: body.category
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
