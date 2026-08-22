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

// Structural accessibility. Contrast is enforced at the token level (every
// foreground/ground pair clears WCAG AA 4.5:1 in both themes); these cover the
// structure that tokens cannot.
const A11Y_PAGES = ["/", "/about", "/portfolio", "/portfolio/nexuswatch", "/writing"];

for (const path of A11Y_PAGES) {
  test(`${path} has exactly one h1 and no unlabelled images or links`, async ({
    page,
  }) => {
    await page.goto(path);

    await expect(page.locator("h1")).toHaveCount(1);

    const unlabelledImages = await page
      .locator("img:not([alt])")
      .count();
    expect(unlabelledImages).toBe(0);

    // Every link must have text a screen reader can announce.
    const links = await page.locator("a").all();
    for (const link of links) {
      const name = (
        (await link.innerText()) ||
        (await link.getAttribute("aria-label")) ||
        ""
      ).trim();
      expect(name.length).toBeGreaterThan(0);
    }
  });
}

test("the page is usable with motion disabled", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(
    page.getByText("I run an AI-native product organization").first()
  ).toBeVisible();
  await expect(page.getByText("Allison's Kitchen").first()).toBeVisible();
  await ctx.close();
});
