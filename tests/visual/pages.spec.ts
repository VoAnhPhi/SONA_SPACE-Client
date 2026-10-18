import nodePath from "node:path";
import { expect, test, type Page } from "@playwright/test";
import { applySession, loginViaApi, suppressPopup, type Session } from "../support/session";

// Full-page screenshots of the main routes at 1440 and 390 wide. The baseline lives outside the
// repo (see playwright.config.ts). After a structure change run `npm run test:visual`; a diff
// means something looks different, not necessarily wrong: look at the image before updating.
const PRODUCT_PATH = process.env.E2E_PRODUCT_PATH || "/san-pham/modena-2-5-cho";

const PUBLIC_PAGES: Array<[name: string, path: string]> = [
  ["home", "/"],
  ["products", "/san-pham"],
  ["category", "/danh-muc/ghe"],
  ["product-detail", PRODUCT_PATH],
  ["rooms", "/khong-gian"],
  ["room-detail", "/khong-gian/phong-khach"],
  ["news", "/tin-tuc"],
  ["about-contact", "/lien-he"],
  ["design-service", "/dich-vu-thiet-ke"],
  ["architecture-profile", "/ho-so-kien-truc"],
  ["sign-in", "/dang-nhap"],
  ["sign-up", "/dang-ky"],
  ["forgot-password", "/quen-mat-khau"],
  ["terms", "/dieu-khoan-su-dung"],
  ["privacy-policy", "/chinh-sach-bao-mat"],
  ["not-found", "/trang-khong-ton-tai"],
];

// "/tai-khoan" and "/tai-khoan/don-hang" are left out: both list orders, which grow with every
// purchase test run.
const ACCOUNT_PAGES: Array<[name: string, path: string]> = [
  ["account-info", "/tai-khoan/thong-tin"],
  ["account-coupons", "/tai-khoan/ma-giam-gia"],
  ["cart-empty", "/gio-hang"],
  ["wishlist", "/san-pham-yeu-thich"],
];

// Elements that change by themselves (autoplay sliders, chat bubble, toasts).
const MASKED = [".swiper", ".banner-slider", ".chat-widget", ".chatbot", ".Toastify", "[class*=chat-bubble]"];

async function settle(page: Page) {
  await page.waitForLoadState("networkidle");
  // Trigger lazy images, then come back to the top before the full-page capture.
  await page.evaluate(async () => {
    const step = Math.max(400, window.innerHeight - 100);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(400);
}

async function capture(page: Page, name: string, path: string) {
  await page.goto(path, { waitUntil: "networkidle" });
  await settle(page);
  await expect(page).toHaveScreenshot(`${name}.png`, {
    fullPage: true,
    caret: "initial",
    stylePath: nodePath.join(__dirname, "capture.css"),
    mask: MASKED.map((selector) => page.locator(selector)),
  });
}

test.describe("public pages", () => {
  test.beforeEach(async ({ context }) => {
    await suppressPopup(context);
  });
  for (const [name, path] of PUBLIC_PAGES) {
    test(name, async ({ page }) => {
      await capture(page, name, path);
    });
  }
});

test.describe("signed-in pages", () => {
  let session: Session;
  test.beforeAll(async () => {
    session = await loginViaApi();
  });
  test.beforeEach(async ({ context }) => {
    await applySession(context, session);
  });
  for (const [name, path] of ACCOUNT_PAGES) {
    test(name, async ({ page }) => {
      await capture(page, name, path);
    });
  }
});
