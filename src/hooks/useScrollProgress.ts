"use client";
import { useEffect, useState } from "react";

export function useScrollProgress(threshold = 0.6) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      const p = Math.min(scrollY / (windowH * threshold), 1);
      setProgress(p);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return progress;
}
