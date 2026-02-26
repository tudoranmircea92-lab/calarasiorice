"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/lib/components/ui/input";
import { Business } from "@/lib/types";
import Link from "next/link";

export function SearchBar({ businesses }: { businesses: Business[] }) {
  const [value, setValue] = useState("");
  const results = useMemo(() => businesses.filter((b) => b.name.toLowerCase().includes(value.toLowerCase())).slice(0, 4), [businesses, value]);

  return (
    <div className="sticky top-0 z-30 space-y-2 bg-white py-3">
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={16} />
        <Input placeholder="Caută firme în Călărași..." value={value} onChange={(e) => setValue(e.target.value)} className="pl-9" />
      </div>
      {value && (
        <div className="rounded-xl border border-border bg-white p-2">
          {results.length ? results.map((item) => (
            <Link key={item.id} href={`/business/${item.slug}`} className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-50">{item.name}</Link>
          )) : <p className="px-3 py-2 text-sm text-gray-500">Niciun rezultat.</p>}
        </div>
      )}
    </div>
  );
}
