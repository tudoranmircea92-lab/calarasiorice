import Image from "next/image";
import { Clock3, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { Badge } from "@/lib/components/ui/badge";
import { Card } from "@/lib/components/ui/card";
import { ReviewForm } from "@/lib/components/review-form";
import { getApprovedReviews, getBusinessBySlug } from "@/lib/data";
import { isOpenNow } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function BusinessPage({ params }: { params: { slug: string } }) {
  const business = await getBusinessBySlug(params.slug);
  if (!business) return notFound();
  const reviews = await getApprovedReviews(business.id);
  const open = isOpenNow(business.hours_json);

  return (
    <main className="space-y-4 py-4">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">{business.name}</h1>
        <div className="flex items-center gap-2 text-sm text-gray-600"><Badge>{business.categories?.name}</Badge><Star size={15} className="text-amber-500" />{business.rating_average.toFixed(1)} ({business.review_count})</div>
      </header>
      <div className="relative h-52 overflow-hidden rounded-2xl border border-border">
        <Image src={business.business_images?.[0]?.image_url ?? "https://images.unsplash.com/photo-1555992336-03a23c7b20ee?auto=format&fit=crop&w=1200&q=80"} alt={business.name} fill className="object-cover" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <a href={`tel:${business.phone}`} className="rounded-xl bg-primary p-3 text-center text-sm font-medium text-white"><Phone className="mx-auto mb-1" size={16} />Call</a>
        <a href={`https://wa.me/${business.whatsapp || ""}`} className="rounded-xl border border-border p-3 text-center text-sm"><MessageCircle className="mx-auto mb-1" size={16} />WhatsApp</a>
        <a href={`https://maps.google.com/?q=${encodeURIComponent(business.address)}`} className="rounded-xl border border-border p-3 text-center text-sm"><MapPin className="mx-auto mb-1" size={16} />Map</a>
      </div>
      <Card className="space-y-2 text-sm">
        <p className="flex items-center gap-2"><MapPin size={15} />{business.address}</p>
        <p className="flex items-center gap-2"><Clock3 size={15} />{open ? <span className="text-emerald-600">Open now</span> : <span className="text-rose-600">Închis</span>}</p>
        <p>{business.full_description}</p>
        <ul className="list-inside list-disc text-gray-700"><li>Verificat local</li><li>Răspuns rapid la telefon</li><li>Conținut actualizabil de proprietar</li></ul>
      </Card>
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Recenzii</h2>
        {reviews.length ? reviews.map((r) => <Card key={r.id}><p className="text-sm font-medium">{r.author_name}</p><p className="text-sm text-gray-600">{r.text}</p></Card>) : <p className="text-sm text-gray-500">Fără recenzii încă.</p>}
      </section>
      <section className="space-y-2">
        <h3 className="font-semibold">Lasă o recenzie</h3>
        <ReviewForm businessId={business.id} />
      </section>
      <p className="text-xs text-gray-500"><a href="#" className="underline">Claim this business</a> · <a href="#" className="underline">Suggest an edit</a></p>
    </main>
  );
}
