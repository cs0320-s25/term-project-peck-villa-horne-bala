import { expect, test } from "@playwright/test";
import { setupClerkTestingToken, clerk } from "@clerk/testing/playwright";
import dotenv from "dotenv";

dotenv.config();
const url = "http://localhost:8000";

// If you needed to do something before every test case...
test.beforeEach(async ({ page }) => {
  test.setTimeout(30000);

  setupClerkTestingToken({ page });
  await page.goto(url);
  await clerk.loaded({ page });
  const loginButton = page.getByRole("button", { name: "Sign in" });
  await expect(loginButton).toBeVisible();

  // This logs in/out via _Clerk_, not via actual component interaction. But that's OK.
  // (Clerk's Playwright guide has an example of filling the login form itself.)
  await clerk.signIn({
    page,
    signInParams: {
      strategy: "password",
      password: process.env.E2E_CLERK_USER_PASSWORD!,
      identifier: process.env.E2E_CLERK_USER_USERNAME!,
    },
  });
});