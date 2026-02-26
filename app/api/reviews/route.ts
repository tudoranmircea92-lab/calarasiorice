import { NextResponse } from "next/server";
import { getServerSupabase, hasSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.business_id || !body.author_name || !body.text || !body.rating) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  if (!hasSupabase) return NextResponse.json({ ok: true, mode: "demo" });
  const supabase = getServerSupabase();
  const { error } = await supabase!.from("reviews").insert({ ...body, status: "pending" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
