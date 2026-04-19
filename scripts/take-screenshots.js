const { chromium } = require('playwright');
const path = require('path');

const targets = [
  {
    url: 'https://nexuswatch.io',
    out: 'nexuswatch-preview.png',
    waitFor: 3000,
  },
  {
    url: 'https://meridian.finance',
    out: 'meridian-preview.png',
    waitFor: 3000,
  },
  {
    url: 'https://zerotoship.app',
    out: 'zerotoship-preview.png',
    waitFor: 3000,
  },
  {
    url: 'https://ridgecap.app',
    out: 'ridgecap-preview.png',
    waitFor: 3000,
  },
  {
    url: 'https://family-planner-app-rosy.vercel.app',
    out: 'family-planner-preview.png',
    waitFor: 3000,
  },
];

(async () => {
  const browser = await chromium.launch();
  const outDir = path.join(__dirname, '..', 'public', 'portfolio');

  for (const { url, out, waitFor } of targets) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 800 });
    console.log(`Capturing ${url} ...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(waitFor);
      const outPath = path.join(outDir, out);
      await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width: 1280, height: 800 } });
      console.log(`  ✓ Saved ${out}`);
    } catch (err) {
      console.log(`  ✗ Failed: ${err.message}`);
    }
    await page.close();
  }

  await browser.close();
})();
