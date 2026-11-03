import { test as base, Page, expect } from '@playwright/test';



 type MyFixtures = {
    linkFeature: Page;
};

export const test = base.extend<MyFixtures>({

    linkFeature: async ({ page }, use) => {

        await page.goto('https://example.com/login');
        await use(page);
    }

});

export { expect };
