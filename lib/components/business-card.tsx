import Link from "next/link";
import { MapPin, Phone, Star } from "lucide-react";
import { Badge } from "@/lib/components/ui/badge";
import { Card } from "@/lib/components/ui/card";
import { isOpenNow, priceLabel } from "@/lib/utils";
import { Business } from "@/lib/types";

export function BusinessCard({ business }: { business: Business }) {
  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link href={`/business/${business.slug}`} className="text-base font-semibold text-gray-900">
            {business.name}
          </Link>
          <p className="mt-1 text-sm text-gray-500">{business.short_description}</p>
        </div>
        <Badge>{business.categories?.name ?? "Categorie"}</Badge>
      </div>
      <div className="flex items-center gap-3 text-xs text-gray-600">
        <span className="inline-flex items-center gap-1"><Star size={14} className="text-amber-500" />{business.rating_average.toFixed(1)} ({business.review_count})</span>
        <span>{priceLabel(business.price_level)}</span>
        <span className={isOpenNow(business.hours_json) ? "text-emerald-600" : "text-rose-600"}>{isOpenNow(business.hours_json) ? "Deschis" : "Închis"}</span>
      </div>
      <div className="flex gap-2">
        <a href={`tel:${business.phone}`} className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-border p-2 text-sm"><Phone size={14} />Sună</a>
        <a href={`https://maps.google.com/?q=${encodeURIComponent(business.address)}`} target="_blank" className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-border p-2 text-sm"><MapPin size={14} />Hartă</a>
      </div>
    </Card>
  );
}
