import { test, expect, type Page } from "@playwright/test";

const ROUTES: { path: string; expectText: string }[] = [
  { path: "/", expectText: "I lead product strategy, build strong teams" },
  { path: "/leadership", expectText: "I helped turn separate business needs into a shared platform strategy" },
  { path: "/about", expectText: "Life at home" },
  { path: "/portfolio", expectText: "What I’m building" },
  { path: "/writing", expectText: "The Data Product Agent" },
  { path: "/resume", expectText: "Ethan Stuart" },
  { path: "/contact", expectText: "The work I want to lead" },
  { path: "/portfolio/allisons-kitchen", expectText: "Allison’s Kitchen" },
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
// Gridiron followed on 2026-10-08, on Ethan's instruction.
const RETIRED = ["meridian", "ridgecap", "quant-engine", "sports-ml", "gridiron"];

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

test("the featured portfolio projects show where they stand", async ({ page }) => {
  await page.goto("/portfolio");
  const featured = page.locator(".portfolio-list article");
  await expect(featured).toHaveCount(3);
  await expect(featured.getByText(/inviting selected households/)).toBeVisible();
  await expect(featured.getByText(/public ledger/)).toBeVisible();
  await expect(featured.getByText(/in use in my own work/)).toBeVisible();
});

test("the portfolio disclosure exposes links to other work", async ({ page }) => {
  await page.goto("/portfolio");
  await page.getByText("More work and experiments", { exact: true }).click();
  await expect(page.getByRole("link", { name: "Altogether" })).toBeVisible();
  await expect(page.getByRole("link", { name: "The Composer" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Prototype Studio" })).toBeVisible();
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
  // Gridiron was removed from the register on 2026-10-08.
  "Gridiron",
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
  // Headline retired 2026-10-08: the site repositioned to AI & software
  // product leadership, with data as a supporting strength.
  "Data & AI Product Leadership",
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

test("the home page serves the current leadership and project stories", async ({ page }) => {
  await page.goto("/");
  const body = await renderedText(page);
  for (const required of [
    "I lead product strategy, build strong teams",
    "product function for the data and AI/ML platform",
    "Yum / Taco Bell",
    "Allison’s Kitchen",
    "NexusWatch",
    "Product OS",
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

const A11Y_PAGES = ["/", "/leadership", "/about", "/portfolio", "/portfolio/nexuswatch", "/writing"];

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

    // Check links exposed to assistive technology. Links in a closed details
    // element can have an empty innerText even when their labels are present.
    await expect(page.getByRole("link", { name: /^\s*$/ })).toHaveCount(0);
  });
}

test("the page is usable with motion disabled", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(
    page.getByText("I lead product strategy, build strong teams").first()
  ).toBeVisible();
  await expect(page.getByText("Allison’s Kitchen").first()).toBeVisible();
  await ctx.close();
});

test("a hiring visitor can reach leadership evidence and contact", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Explore my work" }).click();
  await expect(page).toHaveURL(/\/#leadership$/);
  await page.getByRole("link", { name: "More about my leadership work" }).click();
  await expect(page).toHaveURL(/\/leadership$/);
  await page.getByRole("navigation", { name: "On this page" })
    .getByRole("link", { name: "The work I want to lead" }).click();
  await expect(page).toHaveURL(/\/leadership#contact$/);
  await expect(page.locator('#contact a[href^="mailto:"]')).toBeInViewport();

  await page.getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Get in touch" }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole("main").getByRole("link", { name: /LinkedIn/ })).toBeVisible();
});
