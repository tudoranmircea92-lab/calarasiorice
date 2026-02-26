import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn("flex h-11 w-full rounded-xl border border-border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary", className)}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
