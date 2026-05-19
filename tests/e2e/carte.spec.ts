import { test, expect } from "@playwright/test";

test.describe("Carte — page publique", () => {
  test("page /carte accessible et affiche 2 images", async ({ page }) => {
    await page.goto("/carte");
    await expect(page).toHaveTitle(/carte/i);
    // 2 figures avec next/image
    const figures = page.locator("figure img");
    await expect(figures).toHaveCount(2);
  });

  test("CTA téléphone présent", async ({ page }) => {
    await page.goto("/carte");
    const tel = page.locator('a[href^="tel:"]').first();
    await expect(tel).toBeVisible();
  });

  test("retour à l'accueil cliquable", async ({ page }) => {
    await page.goto("/carte");
    await page.locator('a[aria-label*="accueil"]').first().click();
    await page.waitForURL(/cabane135\.fr\/?$|\/$/);
  });

  test("API /api/menu retourne 2 slots", async ({ request }) => {
    const res = await request.get("/api/menu");
    expect(res.ok()).toBe(true);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body).toHaveLength(2);
    expect(body[0]).toMatchObject({ slot: 1, url: expect.any(String) });
    expect(body[1]).toMatchObject({ slot: 2, url: expect.any(String) });
  });

  test("API PATCH /api/menu sans auth → 401", async ({ request }) => {
    const res = await request.patch("/api/menu", {
      data: {
        slot: 1,
        url: "https://abc.public.blob.vercel-storage.com/menu.jpg",
      },
    });
    expect(res.status()).toBe(401);
  });

  test("admin /admin/carte protégée", async ({ page }) => {
    await page.goto("/admin/carte");
    await page.waitForURL(/\/admin\/login/, { timeout: 5000 });
    expect(page.url()).toContain("/admin/login");
  });
});
