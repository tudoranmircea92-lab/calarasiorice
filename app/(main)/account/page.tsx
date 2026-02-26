import Link from "next/link";
import { Card } from "@/lib/components/ui/card";

export default function AccountPage() {
  return <main className="space-y-3 py-4"><h1 className="text-xl font-bold">Cont</h1><Card><p className="text-sm">Autentificarea Supabase poate fi activată prin variabilele de mediu.</p><Link href="/admin" className="mt-2 inline-block text-sm text-primary underline">Intră în admin</Link></Card></main>;
}
