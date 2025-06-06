import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",import { defineConfig, devices } from "@playwright/test";

  export default defineConfig({
    testDir: "./tests",
    /* Run tests in files in parallel */
    fullyParallel: false,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: "html",
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
      /* Base URL to use in actions like `await page.goto('/')`. */
  
      // baseURL: 'http://127.0.0.1:3000',
  
      /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      trace: "on-first-retry",
    },
  
    projects: [
      {
        name: "auth",
        testMatch: /global\.setup\.ts/,
      },
      {
        name: "chromium",
        use: { ...devices["Desktop Chrome"] },
        dependencies: ["auth"],
      },
  
      {
        name: "firefox",
        use: { ...devices["Desktop Firefox"] },
        dependencies: ["auth"],
      },
  
      {
        name: "webkit",
        use: { ...devices["Desktop Safari"] },
        dependencies: ["auth"],
      },
    ],
    /* Run your local dev server before starting the tests */
    webServer: {
      command: "npm start",
      url: "http://localhost:8000",
      reuseExistingServer: !process.env.CI,
    },
  });
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */

    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "auth",
      testMatch: /global\.setup\.ts/,
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["auth"],
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      dependencies: ["auth"],
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
      dependencies: ["auth"],
    },
  ],
  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm start",
    url: "http://localhost:8000",
    reuseExistingServer: !process.env.CI,
  },
});
