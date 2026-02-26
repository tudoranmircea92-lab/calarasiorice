"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUserRound, Grid2x2, Home, PlusSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Acasă", icon: Home },
  { href: "/#categorii", label: "Categorii", icon: Grid2x2 },
  { href: "/add-business", label: "Adaugă", icon: PlusSquare },
  { href: "/account", label: "Cont", icon: CircleUserRound }
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-md justify-around py-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn("flex min-w-16 flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs", active ? "text-primary" : "text-gray-500")}>
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
