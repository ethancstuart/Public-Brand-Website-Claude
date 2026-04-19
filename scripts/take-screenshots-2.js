const { chromium } = require('playwright');
const path = require('path');

const targets = [
  {
    url: 'https://meridian-teal.vercel.app',
    out: 'meridian-preview.png',
    waitFor: 4000,
  },
  {
    url: 'https://nexuswatch.dev',
    out: 'nexuswatch-app-preview.png',
    waitFor: 5000,
  },
  {
    url: 'https://quant-terminal-lime.vercel.app',
    out: 'quant-engine-preview.png',
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
      await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(waitFor);
      const outPath = path.join(outDir, out);
      await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width: 1280, height: 800 } });
      console.log(`  ✓ Saved ${out}`);
    } catch (err) {
      console.log(`  ✗ Failed (${url}): ${err.message.split('\n')[0]}`);
    }
    await page.close();
  }

  await browser.close();
})();
