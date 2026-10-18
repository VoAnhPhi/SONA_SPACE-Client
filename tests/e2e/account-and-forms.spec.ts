import { expect, test } from "@playwright/test";
import { applySession, loginViaApi, suppressPopup, watchProblems, type Session } from "../support/session";

let session: Session;

test.beforeAll(async () => {
  session = await loginViaApi();
});

test.describe("account tabs", () => {
  test.beforeEach(async ({ context }) => {
    await applySession(context, session);
  });

  test("tab URLs open the matching tab and Back/Forward follow them", async ({ page }) => {
    const watcher = watchProblems(page);
    const tabs: Array<{ path: string; marker: string }> = [
      { path: "/tai-khoan/thong-tin", marker: "Chỉnh sửa" },
      { path: "/tai-khoan/ma-giam-gia", marker: "Flash Sale" },
      { path: "/tai-khoan/don-hang", marker: "Chờ xác nhận" },
    ];

    for (const tab of tabs) {
      await page.goto(tab.path, { waitUntil: "networkidle" });
      await expect(page.getByRole("button", { name: tab.marker }).first()).toBeVisible();
    }

    // Sidebar clicks change the URL and the active tab together
    await page.goto("/tai-khoan", { waitUntil: "networkidle" });
    await page.getByText("Thông tin cá nhân", { exact: true }).locator("visible=true").first().click();
    await expect(page).toHaveURL(/\/tai-khoan\/thong-tin$/);
    await expect(page.getByRole("button", { name: "Chỉnh sửa" }).first()).toBeVisible();
    await page.getByText("Mã giảm giá", { exact: true }).locator("visible=true").first().click();
    await expect(page).toHaveURL(/\/tai-khoan\/ma-giam-gia$/);
    await expect(page.locator("li.active", { hasText: "Mã giảm giá" })).toBeVisible();
    watcher.assertClean();
  });

  test("order list filters by status", async ({ page }) => {
    await page.goto("/tai-khoan/don-hang", { waitUntil: "networkidle" });
    for (const label of ["Chờ xác nhận", "Đã hủy", "Tất cả"]) {
      await page.getByRole("button", { name: label }).first().click();
      await expect(page.locator("button.active", { hasText: label }).first()).toBeVisible();
    }
  });

  test("anonymous visit to the account page does not show account data", async ({ browser }) => {
    const context = await browser.newContext();
    await suppressPopup(context);
    const page = await context.newPage();
    await page.goto("/tai-khoan", { waitUntil: "networkidle" });
    await expect(page.locator(".account-menu__trigger")).toHaveCount(0);
    await expect(page.getByText("Thông tin cá nhân", { exact: true })).toHaveCount(0);
    await context.close();
  });
});

test.describe("forms", () => {
  test.beforeEach(async ({ context }) => {
    await suppressPopup(context);
  });

  test("contact form validates an empty submit and does not call the API", async ({ page }) => {
    const apiCalls: string[] = [];
    page.on("request", (request) => {
      if (request.method() === "POST" && request.url().includes("/api/contact")) apiCalls.push(request.url());
    });
    await page.goto("/lien-he", { waitUntil: "networkidle" });
    const submit = page.locator("form button[type=submit]").first();
    await submit.scrollIntoViewIfNeeded();
    await submit.click();
    await expect(page.locator(".error, .error-message, [class*=error]").first()).toBeVisible();
    expect(apiCalls).toEqual([]);
  });

  test("login form rejects an empty submit", async ({ page }) => {
    await page.goto("/dang-nhap", { waitUntil: "networkidle" });
    await page.locator("form button[type=submit]").click();
    await expect(page).toHaveURL(/\/dang-nhap/);
  });
});

test.describe("wishlist", () => {
  test.beforeEach(async ({ context }) => {
    await applySession(context, session);
  });

  test("wishlist page loads for a signed-in user", async ({ page }) => {
    const watcher = watchProblems(page);
    await page.goto("/san-pham-yeu-thich", { waitUntil: "networkidle" });
    await expect(page.locator("header").first()).toBeVisible();
    watcher.assertClean();
  });
});
