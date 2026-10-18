import { expect, test } from "@playwright/test";
import { suppressPopup, watchProblems } from "../support/session";

// Every public route renders its main heading without console errors or API 5xx.
const PAGES: Array<{ path: string; heading: RegExp }> = [
  { path: "/", heading: /KHUYỄN MÃI|Sản phẩm|Nội thất/i },
  { path: "/san-pham", heading: /Sản phẩm/i },
  { path: "/danh-muc/ghe", heading: /Ghế/ },
  { path: "/khong-gian", heading: /KHÔNG GIAN/ },
  { path: "/khong-gian/phong-khach", heading: /Phòng khách/ },
  { path: "/tin-tuc", heading: /TIN TỨC VỀ NỘI THẤT/ },
  { path: "/lien-he", heading: /Không gian có chủ đích/ },
  { path: "/dich-vu-thiet-ke", heading: /Thiết kế không gian sống theo đúng cách bạn sống/ },
  { path: "/ho-so-kien-truc", heading: /Experience/ },
  { path: "/dang-nhap", heading: /Đăng nhập/ },
  { path: "/dang-ky", heading: /Đăng ký tài khoản/ },
  { path: "/quen-mat-khau", heading: /Quên mật khẩu/ },
  { path: "/dieu-khoan-su-dung", heading: /ĐIỀU KHOẢN SỬ DỤNG/ },
  { path: "/chinh-sach-bao-mat", heading: /CHÍNH SÁCH BẢO MẬT/ },
  { path: "/trang-khong-ton-tai", heading: /không thể tìm thấy trang/ },
];

test.describe("public pages", () => {
  test.beforeEach(async ({ context }) => {
    await suppressPopup(context);
  });

  for (const { path, heading } of PAGES) {
    test(`${path} renders`, async ({ page }) => {
      const watcher = watchProblems(page);
      await page.goto(path, { waitUntil: "networkidle" });
      await expect(page.locator("h1:visible, h2:visible").filter({ hasText: heading }).first()).toBeVisible();
      await expect(page.locator("header").first()).toBeVisible();
      watcher.assertClean();
    });
  }

  test("unknown deep link keeps the SPA fallback (no server 404 page)", async ({ page }) => {
    const response = await page.goto("/danh-muc/ghe", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
  });

  test("no horizontal overflow on the home page", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
