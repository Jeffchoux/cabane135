import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      "flex h-11 w-full rounded-sm border border-white/10 bg-white/5 px-3 py-2 text-sm text-[var(--pearl)] placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]/40 disabled:opacity-50",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";
