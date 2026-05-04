import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:3001",
    headless: true,
  },
  webServer: {
    command: "npm run build && npm start -- -p 3001",
    url: "http://localhost:3001",
    timeout: 180_000,
    reuseExistingServer: !process.env.CI,
  },
});
