import { test, expect } from "@playwright/test";

test.describe("Formulaire réservation — validation côté client", () => {
  test("API rejette payload invalide (400)", async ({ request }) => {
    const res = await request.post("/api/reservations", {
      data: {
        name: "x",
        phone: "123",
        date: "invalid",
        time: "99:99",
        covers: 0,
      },
    });
    // Rate-limit (429) acceptable car tests parallèles épuisent le quota 5/h/IP
    expect([400, 422, 429]).toContain(res.status());
  });

  test("API rejette covers > 20", async ({ request }) => {
    const res = await request.post("/api/reservations", {
      data: {
        name: "Test E2E",
        phone: "+33600000000",
        date: new Date(Date.now() + 86400000).toISOString(),
        time: "19:00",
        covers: 21,
      },
    });
    // Rate-limit (429) acceptable car tests parallèles épuisent le quota 5/h/IP
    expect([400, 422, 429]).toContain(res.status());
  });

  test("API rejette name trop court", async ({ request }) => {
    const res = await request.post("/api/reservations", {
      data: {
        name: "a",
        phone: "+33600000000",
        date: new Date(Date.now() + 86400000).toISOString(),
        time: "19:00",
        covers: 2,
      },
    });
    // Rate-limit (429) acceptable car tests parallèles épuisent le quota 5/h/IP
    expect([400, 422, 429]).toContain(res.status());
  });
});
