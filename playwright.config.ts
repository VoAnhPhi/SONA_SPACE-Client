import os from "node:os";
import path from "node:path";
import { defineConfig } from "@playwright/test";

// Needs the API on http://localhost:3501 (SONA_SPACE-Server, seeded with
// db/seeds/local-commerce-fixture.sql). Vite is started here when it is not already running.
//
//   npm run test:e2e      behavior smoke (tests/e2e/*.spec.ts)
//   npm run test:visual   screenshot comparison (tests/visual/*.spec.ts)
//   npm run test:visual:update   rewrite the visual baseline
//
// Screenshots never live inside the repo: the baseline and the failure output go to
// ~/Pictures/Claude/Sona/folder-migration/.
const ARTIFACTS = path.join(os.homedir(), "Pictures", "Claude", "Sona", "folder-migration");
const BASE_URL = process.env.E2E_BASE_URL || "http://localhost:5173";

export default defineConfig({
  testDir: "./tests",
  outputDir: path.join(ARTIFACTS, "test-results"),
  snapshotPathTemplate: path.join(ARTIFACTS, "visual-baseline", "{projectName}", "{testFilePath}", "{arg}{ext}"),
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"]],
  timeout: 60_000,
  expect: {
    timeout: 10_000,
    toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: "disabled" },
  },
  use: {
    baseURL: BASE_URL,
    channel: "chrome",
    reducedMotion: "reduce",
    trace: "off",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { viewport: { width: 390, height: 844 }, hasTouch: true } },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: "npx vite --port 5173 --strictPort",
        url: BASE_URL,
        reuseExistingServer: true,
        timeout: 60_000,
      },
});
