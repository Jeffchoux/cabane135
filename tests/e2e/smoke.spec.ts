import { test, expect } from "@playwright/test";

test.describe("Smoke — pages publiques", () => {
  test("homepage charge et affiche le branding", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Cabane 135|Huîtres|Lebon/i);
    await expect(page.locator("body")).toBeVisible();
  });

  test("page /confidentialite accessible", async ({ page }) => {
    const res = await page.goto("/confidentialite");
    expect(res?.status()).toBeLessThan(400);
    await expect(page.getByRole("heading").first()).toBeVisible();
  });

  test("page /cgu accessible", async ({ page }) => {
    const res = await page.goto("/cgu");
    expect(res?.status()).toBeLessThan(400);
  });

  test("page /mentions-legales accessible", async ({ page }) => {
    const res = await page.goto("/mentions-legales");
    expect(res?.status()).toBeLessThan(400);
  });

  test("admin login affiche le formulaire", async ({ page }) => {
    await page.goto("/admin/login");
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test("admin route protégée redirige sans session", async ({ page }) => {
    await page.goto("/admin");
    await page.waitForURL(/\/admin\/login/, { timeout: 5000 });
    expect(page.url()).toContain("/admin/login");
  });

  test("robots.txt servi", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain("User-agent");
  });

  test("sitemap.xml servi", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain("urlset");
  });
});
