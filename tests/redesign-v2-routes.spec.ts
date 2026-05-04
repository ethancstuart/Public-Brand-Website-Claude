import { test, expect } from "@playwright/test";

const ROUTES: { path: string; expectText: string }[] = [
  { path: "/",          expectText: "ETHAN" },
  { path: "/about",     expectText: "ABOUT" },
  { path: "/portfolio", expectText: "SELECTED WORK" },
  { path: "/writing",   expectText: "Field notes" },
  { path: "/resume",    expectText: "Ethan Stuart" },
  { path: "/contact",   expectText: "Open to conversation" },
];

for (const { path, expectText } of ROUTES) {
  test(`route ${path} renders without errors`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    const response = await page.goto(path);
    expect(response?.ok()).toBe(true);
    await expect(page.getByText(expectText, { exact: false }).first()).toBeVisible();
    expect(consoleErrors).toEqual([]);
  });
}
