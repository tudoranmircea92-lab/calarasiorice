import { notFound } from "next/navigation";
import { BusinessCard } from "@/lib/components/business-card";
import { getBusinessesByCategory, getCategories } from "@/lib/data";

export default async function CategoryPage({ params, searchParams }: { params: { slug: string }; searchParams: { open?: string; price?: string; zone?: string } }) {
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) return notFound();
  let businesses = await getBusinessesByCategory(params.slug);
  if (searchParams.open === "1") businesses = businesses.filter((b) => b.hours_json.mon !== "closed");
  if (searchParams.price) businesses = businesses.filter((b) => String(b.price_level) === searchParams.price);
  if (searchParams.zone) businesses = businesses.filter((b) => b.neighborhood === searchParams.zone);

  return (
    <main className="space-y-4 py-4">
      <h1 className="text-xl font-bold">{category.name}</h1>
      <div className="flex gap-2 overflow-auto pb-1 text-sm">
        <a href={`?open=1`} className="rounded-full border border-border px-3 py-1">Open now</a>
        <a href={`?price=1`} className="rounded-full border border-border px-3 py-1">€</a>
        <a href={`?price=2`} className="rounded-full border border-border px-3 py-1">€€</a>
        <a href={`?zone=Centru`} className="rounded-full border border-border px-3 py-1">Centru</a>
      </div>
      {businesses.length ? <div className="space-y-3">{businesses.map((b) => <BusinessCard key={b.id} business={b} />)}</div> : <p className="text-sm text-gray-500">Nicio firmă pentru filtrele selectate.</p>}
    </main>
  );
}
