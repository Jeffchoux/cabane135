"use client";
import { useState } from "react";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { ReservationPanel } from "./ReservationPanel";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Nav onReserve={() => setOpen(true)} />
      <Hero onReserve={() => setOpen(true)} />
      {children}
      <ReservationPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}
