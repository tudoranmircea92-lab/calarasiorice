import Link from "next/link";
import { Building2 } from "lucide-react";
import { SearchBar } from "@/lib/components/search-bar";
import { BusinessCard } from "@/lib/components/business-card";
import { Card } from "@/lib/components/ui/card";
import { getCategories, getFeaturedBusinesses } from "@/lib/data";

export default async function HomePage() {
  const [categories, featured] = await Promise.all([getCategories(), getFeaturedBusinesses()]);
  return (
    <main className="space-y-5 py-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">CălărașiOrice</h1>
        <p className="text-sm text-gray-600">Găsești rapid firme locale, direct de pe telefon.</p>
      </header>
      <SearchBar businesses={featured} />
      <section id="categorii" className="space-y-3">
        <h2 className="text-lg font-semibold">Categorii</h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.slug}`}>
              <Card className="flex items-center gap-2 p-4">
                <Building2 size={18} className="text-primary" />
                <span className="text-sm font-medium">{cat.name}</span>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Top azi</h2>
        <div className="space-y-3">{featured.map((biz) => <BusinessCard key={biz.id} business={biz} />)}</div>
      </section>
    </main>
  );
}
