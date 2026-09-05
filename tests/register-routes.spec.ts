import { test, expect, type Page } from "@playwright/test";

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
  { path: "/portfolio/gridiron", expectText: "Gridiron" },
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
  // Seven products, plus the four legend entries above them.
  await expect(statuses).toHaveCount(11);
});

test("renamed products show their alias trail", async ({ page }) => {
  await page.goto("/portfolio");
  await expect(page.getByText("formerly Zero to Ship")).toBeVisible();
  await expect(page.getByText(/formerly Stuart Pantry/)).toBeVisible();
  await expect(
    page.getByText(/formerly Long Table, formerly Caravan/)
  ).toBeVisible();
});


/**
 * Read the page's text only once it has actually rendered.
 *
 * `page.goto()` resolves before the root loading.tsx boundary is replaced, so a
 * bare `innerText()` can return the LOADING shell. That is not merely flaky: an
 * absence assertion ("this dead string is not present") would PASS against a
 * page that never rendered, which is exactly the false confidence these tests
 * exist to prevent. Every page has exactly one h1, so wait for it first.
 */
async function renderedText(page: Page): Promise<string> {
  await page.locator("h1").first().waitFor({ state: "visible" });
  const text = await page.locator("body").innerText();
  expect(text, "page never rendered past the loading state").not.toMatch(
    /^\s*ETHAN STUART[\s\S]*LOADING/
  );
  return text;
}

// A 200 proves a server answered, not that it answered with the build you just
// shipped. `/` once served a stale ISR entry from the previous release behind a
// perfectly healthy 200, so every page is checked for CONTENT, not status.
const DEAD_COPY = [
  "Meridian",
  "RidgeCap",
  "Quant Engine",
  "Sports ML",
  "Modeling Lab",
  "RE Stack",
  "eight products",
  "nexuswatch.io",
  "zerotoship.dev",
  "scale just changes",
  // Masthead was dropped as a planned product on 2026-08-23.
  "Masthead",
  // Disney figures superseded 2026-08-23, revised 2026-09-05 against the
  // promotion packet. "BI Engineering" was wrongly listed as dead in August;
  // it is the true title, so the dead fact is now the August one.
  "45-person",
  "50+ person",
  "500+ downstream",
  "1,000+ downstream",
  "studio groups",
  "Jira",
  "Data & AI Products and Analytics Engineering",
];

for (const path of [...ROUTES.map((r) => r.path)]) {
  test(`${path} carries no dead copy`, async ({ page }) => {
    await page.goto(path);
    const body = await renderedText(page);
    for (const dead of DEAD_COPY) {
      expect(body, `"${dead}" must not appear on ${path}`).not.toContain(dead);
    }
  });
}

test("the home page is the register, not a stale build", async ({ page }) => {
  await page.goto("/");
  const body = await renderedText(page);
  for (const required of [
    "I run an AI-native product organization",
    "How the work gets made",
    "Operating record",
    "Allison's Kitchen",
    "Prototype Studio",
  ]) {
    expect(body).toContain(required);
  }
});

// The old name is allowed only as the alias trail, never as a live product.
for (const path of ["/", "/portfolio"]) {
  test(`${path} shows "Zero to Ship" only as an alias`, async ({ page }) => {
    await page.goto(path);
    const body = await renderedText(page);
    const total = (body.match(/Zero to Ship/g) ?? []).length;
    const aliased = (body.match(/formerly Zero to Ship/g) ?? []).length;
    expect(total).toBe(aliased);
  });
}

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
