"use client";
import dynamic from "next/dynamic";

export const CabaneMapClient = dynamic(
  () => import("./CabaneMap").then((m) => m.CabaneMap),
  { ssr: false, loading: () => null }
);
