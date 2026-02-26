import { redirect } from "next/navigation";
import { getServerSupabase, hasSupabase } from "@/lib/supabase";
import { getCategories, getFeaturedBusinesses } from "@/lib/data";
import { Card } from "@/lib/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (hasSupabase) {
    const supabase = getServerSupabase();
    const { data } = await supabase!.auth.getUser();
    if (!data.user) redirect("/");
  }

  const [categories, featured] = await Promise.all([getCategories(), getFeaturedBusinesses()]);

  return (
    <main className="main-container space-y-4 py-4">
      <h1 className="text-2xl font-bold">Admin dashboard</h1>
      <Card><h2 className="font-semibold">Categorii ({categories.length})</h2><p className="text-sm text-gray-600">Management prin Supabase table editor sau endpointuri API.</p></Card>
      <Card><h2 className="font-semibold">Top azi ({featured.length})</h2><p className="text-sm text-gray-600">Setează is_featured pentru business-uri.</p></Card>
      <Card><h2 className="font-semibold">Recenzii</h2><p className="text-sm text-gray-600">Aprobă/respinge recenziile din /api/admin/reviews.</p></Card>
    </main>
  );
}
