import { expect, test } from "@playwright/test";
import { applySession, clearCart, loginViaApi, QA_USER, suppressPopup, watchProblems, type Session } from "../support/session";

// Writes to the local database (one COD order per run, cancelled again at the end), so it runs
// on the desktop project only.
test.beforeEach(({}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "purchase flow runs on desktop only");
});
test.describe.configure({ mode: "serial" });

const PRODUCT_PATH = process.env.E2E_PRODUCT_PATH || "/san-pham/modena-2-5-cho";

let session: Session;

test.beforeAll(async () => {
  session = await loginViaApi();
});

test.describe("sign in", () => {
  test("form login lands on the home page with the account menu", async ({ page, context }) => {
    await suppressPopup(context);
    const watcher = watchProblems(page);
    await page.goto("/dang-nhap", { waitUntil: "networkidle" });
    await page.locator("input[name=email]").fill(QA_USER.email);
    await page.locator("input[name=password]").fill(QA_USER.password);
    await page.locator("form button[type=submit]").click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator(".account-menu__trigger")).toContainText("Chào");
    watcher.assertClean();
  });

  test("wrong password stays on the form", async ({ page, context }) => {
    await suppressPopup(context);
    await page.goto("/dang-nhap", { waitUntil: "networkidle" });
    await page.locator("input[name=email]").fill(QA_USER.email);
    await page.locator("input[name=password]").fill("not-the-password");
    await page.locator("form button[type=submit]").click();
    await expect(page).toHaveURL(/\/dang-nhap/);
    await expect(page.locator(".account-menu__trigger")).toHaveCount(0);
  });
});

test.describe("cart to COD order", () => {
  test.beforeEach(async ({ context }) => {
    await applySession(context, session);
    await clearCart(session);
  });

  test("add to cart, check out with COD, view and cancel the order", async ({ page }) => {
    const watcher = watchProblems(page);

    // Product detail -> cart
    await page.goto(PRODUCT_PATH, { waitUntil: "networkidle" });
    await page.locator("button.button-add-cart").click();
    await expect(page.locator(".Toastify__toast").first()).toContainText("Đã thêm vào giỏ hàng");

    await page.goto("/gio-hang", { waitUntil: "networkidle" });
    await expect(page.locator("input.cart-check")).toHaveCount(2); // select-all + one row
    await page.locator("input.cart-check").first().check();
    await expect(page.locator("input.cart-check:checked")).toHaveCount(2);

    // Cart -> checkout, shipping details come from the profile
    await page.locator("button.checkout-btn").click();
    await expect(page).toHaveURL(/\/thanh-toan$/);
    await expect(page.locator("input[name=fullName]")).toHaveValue("QA E2E");
    await expect(page.locator("input[name=phone]")).toHaveValue("0900000001");
    await expect(page.locator("input[name=paymentMethod]").first()).toBeChecked(); // COD is the default

    // The terms checkbox gates the submit
    await page.locator("button.checkout-btn").click();
    await expect(page).toHaveURL(/\/thanh-toan$/);
    await page.locator("#clause").check();
    await page.locator("button.checkout-btn").click();

    await expect(page).toHaveURL(/\/dat-hang-thanh-cong\/[A-Za-z0-9]+$/, { timeout: 20_000 });
    const orderHash = page.url().split("/").pop()!;
    await expect(page.getByText(orderHash).first()).toBeVisible();

    // Account -> orders list -> order detail (URL uses the order hash)
    await page.goto("/tai-khoan/don-hang", { waitUntil: "networkidle" });
    const detailLink = page.locator(`a[href='/chi-tiet-don-hang/${orderHash}']`).first();
    await expect(detailLink).toBeVisible();
    await detailLink.click();
    await expect(page).toHaveURL(new RegExp(`/chi-tiet-don-hang/${orderHash}$`));
    await expect(page.getByText(orderHash).first()).toBeVisible();

    // Cancel modal: the reason needs 150+ characters; confirming cancels the order and restores
    // stock, which keeps repeated runs from draining the fixture product.
    await page.waitForLoadState("networkidle");
    await expect(page.locator("button.btn-cancel-product").first()).toBeVisible();
    await page.getByRole("button", { name: "Hủy đơn hàng" }).first().click();
    const modal = page.locator(".cancel-order-modal");
    await expect(modal).toBeVisible();
    await modal.locator("textarea").fill("Khách hàng kiểm thử tự động hủy đơn hàng này để dọn dữ liệu sau khi chạy bộ kiểm thử đầu cuối. ".repeat(2));
    await modal.locator("button.submit-button").click();
    await expect(modal).toBeHidden({ timeout: 15_000 });
    await expect(page.getByText(/Đã hủy/).first()).toBeVisible();
    watcher.assertClean();
  });
});
