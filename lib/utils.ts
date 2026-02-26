import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const priceLabel = (value: number) => "€".repeat(Math.max(1, Math.min(3, value)));

export const isOpenNow = (hours: Record<string, string>) => {
  const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
  const now = new Date();
  const key = dayNames[now.getDay()];
  const raw = hours[key];
  if (!raw || raw.toLowerCase() === "closed") return false;
  const [start, end] = raw.split("-").map((p) => p.trim());
  if (!start || !end) return false;
  const toMin = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const minutes = now.getHours() * 60 + now.getMinutes();
  return minutes >= toMin(start) && minutes <= toMin(end);
};
