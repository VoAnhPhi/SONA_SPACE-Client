import { expect, test } from "@playwright/test";
import { suppressPopup, watchProblems } from "../support/session";

test.describe("catalog", () => {
  test.beforeEach(async ({ context }) => {
    await suppressPopup(context);
  });

  test("product list filter keeps URL, results and Back/Forward in sync", async ({ page }, testInfo) => {
    // The price dropdown is not visible in the 390px layout (filters sit behind another control).
    test.skip(testInfo.project.name !== "desktop", "desktop filter bar");
    const watcher = watchProblems(page);
    await page.goto("/san-pham", { waitUntil: "networkidle" });
    const cards = page.locator("a.product-tile__link");
    await expect(cards.first()).toBeVisible();
    const initialUrl = page.url();
    expect(new URL(initialUrl).search).toBe("");

    const priceToggle = page.locator("button.pf-drop-btn", { hasText: "Giá" }).first();
    await priceToggle.click();
    await expect(priceToggle).toHaveAttribute("aria-expanded", "true");
    await page.locator("button.pf-row", { hasText: "10 - 30 triệu" }).first().click();

    await expect.poll(() => new URL(page.url()).search).toContain("price=");
    const filteredUrl = page.url();
    await expect(page.locator("button.pf-drop-btn", { hasText: "10 - 30 triệu" }).first()).toBeVisible();

    await page.goBack();
    await expect.poll(() => new URL(page.url()).search).toBe("");
    await expect(page.locator("button.pf-drop-btn", { hasText: "Giá" }).first()).toBeVisible();

    await page.goForward();
    await expect.poll(() => page.url()).toBe(filteredUrl);
    await expect(page.locator("button.pf-drop-btn", { hasText: "10 - 30 triệu" }).first()).toBeVisible();
    watcher.assertClean();
  });

  test("category page lists products and links to a product detail", async ({ page }) => {
    const watcher = watchProblems(page);
    await page.goto("/danh-muc/ghe", { waitUntil: "networkidle" });
    const firstCard = page.locator("a.product-tile__link").first();
    await expect(firstCard).toBeVisible();
    const href = await firstCard.getAttribute("href");
    await firstCard.click();
    await expect(page).toHaveURL(new RegExp(`${href}`));
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.locator("button.button-add-cart")).toBeVisible();
    watcher.assertClean();
  });

  test("product detail switches to the reviews tab", async ({ page }) => {
    await page.goto("/san-pham", { waitUntil: "networkidle" });
    const href = await page.locator("a.product-tile__link").first().getAttribute("href");
    await page.goto(href!, { waitUntil: "networkidle" });
    await expect(page.locator("button.tab-btn.active")).toHaveText("Mô tả");
    await page.locator("button.tab-btn", { hasText: "Đánh giá" }).click();
    await expect(page.locator("button.tab-btn.active")).toHaveText("Đánh giá");
  });
});
