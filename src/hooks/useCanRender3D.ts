"use client";
import { useEffect, useState } from "react";

function supportsWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

export function useCanRender3D(opts: { minWidth?: number } = {}) {
  const { minWidth = 768 } = opts;
  const [ready, setReady] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const evaluate = () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const wideEnough = window.innerWidth >= minWidth;
      const webgl = supportsWebGL();
      setEnabled(!reducedMotion && wideEnough && webgl);
      setReady(true);
    };
    evaluate();
    const onResize = () => evaluate();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [minWidth]);

  return { ready, enabled };
}
