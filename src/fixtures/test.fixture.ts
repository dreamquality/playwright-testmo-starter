import { test as base } from '@playwright/test';
import { PageFactory } from '../factory/page.factory';

type CustomFixtures = {
  pageFactory: PageFactory;
};

export const test = base.extend<CustomFixtures>({
  pageFactory: async ({ page }, use) => {
    await use(new PageFactory(page));
  }
});

export { expect } from '@playwright/test';
