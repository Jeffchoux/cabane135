import { describe, it, expect } from "vitest";
import { cn, formatDateFR } from "@/lib/utils";

describe("cn()", () => {
  it("merge plusieurs classes", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("filtre les valeurs falsy", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });

  it("dédoublonne les classes Tailwind via twMerge", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});

describe("formatDateFR()", () => {
  it("formate une Date en français complet", () => {
    const d = new Date("2026-05-01T12:00:00Z");
    const out = formatDateFR(d);
    expect(out).toMatch(/mai/);
    expect(out).toMatch(/2026/);
  });

  it("accepte aussi une string ISO", () => {
    const out = formatDateFR("2026-05-01T12:00:00Z");
    expect(out).toMatch(/mai/);
    expect(out).toMatch(/2026/);
  });
});
