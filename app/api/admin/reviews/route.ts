import { NextResponse } from "next/server";
import { getServerSupabase, hasSupabase } from "@/lib/supabase";

export async function PATCH(request: Request) {
  const { id, status } = await request.json();
  if (!id || !status) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  if (!hasSupabase) return NextResponse.json({ ok: true, mode: "demo" });
  const supabase = getServerSupabase();
  const { error } = await supabase!.from("reviews").update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
