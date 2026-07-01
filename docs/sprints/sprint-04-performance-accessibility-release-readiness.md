# Sprint 04 - Performance, Accessibility, Release Readiness

- Sprint target: chốt chất lượng trước khi coi client đã sẵn sàng cho vòng ổn định tiếp theo.
- Priority: `P2`
- Status: `In Progress`
- Prepared date: `2026-06-28`

## 1. Goal

Sprint này xử lý nợ kỹ thuật còn lại sau khi UX chính đã ổn:

1. bundle size,
2. CSS/tooling warning,
3. keyboard/accessibility,
4. regression checklist trước release.

## 2. In Scope

- `src/App.tsx`
- các route page nặng như:
  - `src/pages/ProductDetailPage/index.tsx`
  - `src/pages/Payment/index.tsx`
  - `src/pages/User/index.tsx`
  - `src/pages/DetailOrder/index.tsx`
- `vite.config.ts`
- `public/scss/*`
- assets/fonts/icons liên quan

## 3. Current Baseline

Theo build ngày `2026-06-28`:

- JS bundle: `2199.21 kB`
- CSS bundle: `427.95 kB`
- Sass warnings:
  - `@import` deprecated
  - `darken()` deprecated
  - một số asset icon unresolved ở build time

Cập nhật sau build ngày `2026-06-29`:

- Route pages ngoài trang chủ đã được lazy load trong `src/App.tsx`.
- Chunk `router` rỗng đã được loại bỏ sau khi gộp `react-router-dom` về `react-vendor`.
- `vendor` chunk giảm còn khoảng `261.88 kB`.
- Hệ `antd` đã được tách thành nhiều chunk nhỏ hơn:
  - `antd` khoảng `450.70 kB`
  - `antd-forms` khoảng `63.77 kB`
  - `antd-dialog` khoảng `37.10 kB`
  - `antd-media` khoảng `27.32 kB`
  - `antd-icons` khoảng `23.25 kB`
- CSS chính còn khoảng `383.43 kB`.
- Cảnh báo asset `arrow-down*.svg` unresolved đã được xử lý xong.
- Cảnh báo còn lại tập trung ở Sass `@import` deprecated.

## 4. Work Checklist

### Route-Level Performance Audit

- [x] Xác định route/component nặng cần lazy load.
- [x] Chốt plan chunking cho page-level code split.
- [x] Ghi baseline trước khi tối ưu.

### Bundle and Asset Optimization

- [x] Lazy load route nặng.
- [ ] Rà font imports và asset duplication.
- [ ] Giảm các import không cần render ban đầu.

### CSS and Build Cleanup

- [ ] Bắt đầu thay `@import` sang hướng module mới nếu khả thi trong scope.
- [x] Xử lý các warning rõ ràng nhất liên quan Sass function deprecated.
- [x] Kiểm tra asset path cho icon unresolved.

### Accessibility Pass

- [ ] Kiểm tra keyboard navigation cho menu, sidebar, modal, form, CTA.
- [ ] Kiểm tra alt text và aria label cho button/icon chính.
- [ ] Kiểm tra focus visible trên các CTA quan trọng.

### Release Gate

- [ ] Chạy build final.
- [ ] Chạy QA flow chính theo playbook.
- [ ] Cập nhật tracker, blocker, execution log, baseline mới.

## 5. QA Matrix

| Area | Required check | Status |
|---|---|---|
| Bundle | build baseline before/after | [x] |
| Route performance | lazy-loaded pages vẫn hoạt động đúng | [x] |
| CSS | warning chính được giảm hoặc ghi nhận rõ | [x] |
| Accessibility | keyboard/focus/label pass cơ bản | [ ] |
| Responsive | desktop + mobile flow chính | [ ] |

## 6. Risks to Watch

- Tối ưu bundle có thể chạm nhiều import path và side effect.
- CSS cleanup có thể phát sinh visual regression.
- Lazy load route phải đi kèm fallback loading tốt từ Sprint 2.

## 7. Progress Log

| Date | Scope | Done | Evidence | Next |
|---|---|---|---|---|
| 2026-06-29 | Sass warning reduction | Replaced a broad batch of deprecated `darken()`/`invert()` calls with static values across commerce, account, contact, and auth styles; fixed unresolved header arrow asset URLs | `npm run build` passed; unresolved `arrow-down*.svg` warnings no longer appear and repetitive Sass warnings dropped to the remaining global `@import` path | Continue with route-level splitting and chunk rebalance |
| 2026-06-29 | Route splitting + chunk rebalance | Converted non-home routes in `src/App.tsx` to `React.lazy` with a shared loading fallback; updated `vite.config.ts` manual chunks to remove the empty `router` chunk, split toast feedback, and move `antd` ecosystem packages out of `vendor` | `npm run build` passed; `vendor` fell from ~551.20 kB to ~261.88 kB, `router` empty chunk disappeared, and `antd` became the main remaining heavy chunk at ~599.97 kB | Continue with targeted `antd` import audit, font cleanup, and accessibility pass |
| 2026-06-29 | Antd chunk split follow-up | Removed `antd` usage from `src/pages/User/index.tsx`, replaced `CategorySlider` skeleton dependency, lazy-mounted order modals in `DetailOrder`/`User`, and split `antd` internals into forms/dialog/media/icons chunks | `npm run build` passed; no chunk remains above 500 kB, `antd` main chunk reduced to ~450.70 kB, and `vendor` stayed ~261.88 kB | Continue with keyboard/focus accessibility pass and Sass `@import` migration planning |

## 8. Exit Criteria

- Có baseline build trước/sau để so sánh.
- Route nặng đã được tách hợp lý hoặc có plan rõ ràng nếu chưa làm hết.
- Warning build chính đã giảm hoặc được ghi vào blocker log.
- Accessibility pass cơ bản hoàn tất.
- Release checklist cho frontend đã được điền đủ evidence.
