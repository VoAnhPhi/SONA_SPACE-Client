import { expect, type BrowserContext, type Page } from "@playwright/test";

export const API_URL = process.env.E2E_API_URL || "http://localhost:3501/api";

// Seeded by SONA_SPACE-Server/db/seeds/local-commerce-fixture.sql (local databases only).
export const QA_USER = {
  email: process.env.E2E_USER_EMAIL || "qa.e2e@sonaspace.test",
  password: process.env.E2E_USER_PASSWORD || "QaE2e#2026!",
};

export interface Session {
  token: string;
  user: Record<string, unknown>;
}

export async function loginViaApi(): Promise<Session> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(QA_USER),
  });
  if (!response.ok) {
    throw new Error(`QA login failed (${response.status}). Seed the local DB with db/seeds/local-commerce-fixture.sql`);
  }
  return response.json();
}

/** Seed the same storage keys the app writes after a real login. */
export async function applySession(context: BrowserContext, session: Session): Promise<void> {
  await context.addInitScript(([token, user]) => {
    window.localStorage.setItem("authToken", token as string);
    window.localStorage.setItem("user", JSON.stringify(user));
    window.localStorage.setItem("popupLastShownTime", String(Date.now()));
  }, [session.token, session.user] as const);
}

/** Keep the first-visit popup ad from covering pages for anonymous visitors. */
export async function suppressPopup(context: BrowserContext): Promise<void> {
  await context.addInitScript(() => {
    window.localStorage.setItem("popupLastShownTime", String(Date.now()));
  });
}

export async function clearCart(session: Session): Promise<void> {
  await fetch(`${API_URL}/wishlists/clear`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${session.token}` },
  });
}

// Third-party noise and generic resource errors (API failures are checked from responses below).
// "antd: compatible" is a known warning (antd v5 on React 19), tracked as a separate cleanup.
const IGNORED_ERRORS = [/GSI_LOGGER/, /accounts\.google\.com/, /Failed to load resource/, /\[antd: compatible\]/];

// Known API 4xx on a seeded local database: the design-service page asks for a news category
// that does not exist locally.
const ALLOWED_API_FAILURES = [/\/api\/news-categories\/news\//];

/** Collect console/page errors and API 5xx responses; call `assertClean()` at the end of a test. */
export function watchProblems(page: Page) {
  const problems: string[] = [];
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    const text = message.text();
    if (!IGNORED_ERRORS.some((pattern) => pattern.test(text))) problems.push(`console: ${text.slice(0, 200)}`);
  });
  page.on("pageerror", (error) => problems.push(`pageerror: ${error.message.slice(0, 200)}`));
  page.on("response", (response) => {
    const status = response.status();
    const url = response.url();
    const failedApi = status >= 400 && url.includes("/api/") && !ALLOWED_API_FAILURES.some((pattern) => pattern.test(url));
    if (status >= 500 || failedApi) problems.push(`${status} ${response.request().method()} ${url}`);
  });
  return {
    problems,
    assertClean() {
      expect(problems, problems.join("\n")).toEqual([]);
    },
  };
}
