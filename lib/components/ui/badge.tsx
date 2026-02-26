import { cn } from "@/lib/utils";

export const Badge = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700", className)} {...props} />
);
