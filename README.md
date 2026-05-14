# Playwright + TypeScript + Testmo Boilerplate

Production-ready Playwright boilerplate using **TypeScript**, **Page Object Model (POM)**, **Page Factory**, and **custom fixtures** with **Testmo** result submission support.

## Project structure

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml
├── docs/
├── src/
│   ├── factory/
│   ├── fixtures/
│   └── pages/
├── tests/
│   ├── login.spec.ts
│   └── ...
├── playwright.config.ts
└── package.json
```

### Architecture overview

- `BasePage`: common base/marker type for all Page Objects and an extension point for shared behavior.
- `LoginPage`: example Page Object for login interactions/assertions.
- `PageFactory`: central access point for Page Objects.
- `test.fixture.ts`: extends Playwright `test` and injects `pageFactory` into every test.

## Prerequisites

- Node.js 20+
- npm 10+

## Setup

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install --with-deps
```

`@testmo/testmo-cli` is already included in `devDependencies`.

## Running tests locally

Run all tests:

```bash
npm run test
```

Run headed mode:

```bash
npm run test:headed
```

Open HTML report:

```bash
npm run test:report
```

## CI/CD and Testmo environment variables

The GitHub Actions workflow is in:

- `.github/workflows/playwright.yml`

Configure these repository secrets:

- `TESTMO_URL` (for example: `https://your-company.testmo.net`)
- `TESTMO_TOKEN`
- `TESTMO_PROJECT_ID`

The workflow runs tests and then submits JUnit results from:

- `test-results/junit-report.xml`

## Playwright + Testmo setup to see test results

1. Configure Testmo repository secrets in GitHub:
   - `TESTMO_URL`
   - `TESTMO_TOKEN`
   - `TESTMO_PROJECT_ID`
2. Make sure automated test titles use the required Testmo case prefix format: `[C<number>]` (for example: `[C123] Login works`) so CI can map and submit results.
3. Run CI from a pull request or push (workflow: `.github/workflows/playwright.yml`).
4. View results in both places:
   - **GitHub Pages Playwright report**: `https://<owner>.github.io/<repo>/` (for this repository: `https://dreamquality.github.io/playwright-testmo-starter/`)
   - **Testmo run results**: in your Testmo project after the `Submit results to Testmo` workflow step runs.

> CI always uploads/deploys the Playwright HTML report. Testmo submission runs only when Testmo secrets are configured and case mapping validation passes.

## How to write a new test with Page Factory + Fixture

1. Import the custom test fixture:

```ts
import { test, expect } from '../src/fixtures/test.fixture';
```

2. Use `pageFactory` from test context.
3. Prefix test title with Testmo case ID, for example:

```ts
test('[C123] Successful login', async ({ page, pageFactory }) => {
  await page.goto('https://www.saucedemo.com/');
  await pageFactory.loginPage.login('standard_user', 'secret_sauce');
});
```

4. Keep Page Object logic inside `src/pages/*` and instantiate through `PageFactory` only.

> Note: `tests/test-search.spec.ts` still uses the legacy `searchTest` fixture from `tests/tests.ts` (which relies on `fixtures/*` + `pages/*`). Use the `src/fixtures/test.fixture.ts` + `PageFactory` pattern for new tests, and migrate legacy specs incrementally.
