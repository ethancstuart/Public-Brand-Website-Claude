import { test, expect } from "@playwright/test";

const ROUTES: { path: string; expectText: string }[] = [
  { path: "/", expectText: "I run an AI-native product organization" },
  { path: "/about", expectText: "How the work gets made" },
  { path: "/portfolio", expectText: "the status is literal" },
  { path: "/writing", expectText: "The Data Product Agent" },
  { path: "/resume", expectText: "Ethan Stuart" },
  { path: "/contact", expectText: "Open to Director and VP roles" },
  { path: "/portfolio/allisons-kitchen", expectText: "Allison's Kitchen" },
  { path: "/portfolio/nexuswatch", expectText: "NexusWatch" },
  { path: "/portfolio/altogether", expectText: "Altogether" },
  { path: "/portfolio/the-composer", expectText: "Composer" },
  { path: "/portfolio/product-os", expectText: "Product OS" },
  // Slug deliberately retained through the rename.
  { path: "/portfolio/zero-to-ship", expectText: "Prototype Studio" },
];

for (const { path, expectText } of ROUTES) {
  test(`route ${path} renders without errors`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    const response = await page.goto(path);
    expect(response?.ok()).toBe(true);
    await expect(
      page.getByText(expectText, { exact: false }).first()
    ).toBeVisible();
    expect(consoleErrors).toEqual([]);
  });
}

// The four retired products shipped to production and are indexed. They must
// land on the register, not on a dead end.
const RETIRED = ["meridian", "ridgecap", "quant-engine", "sports-ml"];

for (const slug of RETIRED) {
  test(`retired project ${slug} redirects to the register`, async ({ page }) => {
    await page.goto(`/portfolio/${slug}`);
    await expect(page).toHaveURL(/\/portfolio$/);
  });
}

test("an unknown project slug is a real 404, not a soft one", async ({
  page,
}) => {
  const response = await page.goto("/portfolio/not-a-real-project");
  expect(response?.status()).toBe(404);
});

test("every product in the register carries a status", async ({ page }) => {
  await page.goto("/portfolio");
  const statuses = page.getByText(
    /^(Live|Invite|In Development|Paused)$/,
    { exact: true }
  );
  // Six products, plus the four legend entries above them.
  await expect(statuses).toHaveCount(10);
});

test("renamed products show their alias trail", async ({ page }) => {
  await page.goto("/portfolio");
  await expect(page.getByText("formerly Zero to Ship")).toBeVisible();
  await expect(page.getByText(/formerly Stuart Pantry/)).toBeVisible();
  await expect(
    page.getByText(/formerly Long Table, formerly Caravan/)
  ).toBeVisible();
});

test("deleted products appear nowhere in the register", async ({ page }) => {
  await page.goto("/portfolio");
  const body = await page.locator("body").innerText();
  for (const dead of ["Meridian", "RidgeCap", "Quant Engine", "Sports ML"]) {
    expect(body).not.toContain(dead);
  }
});
