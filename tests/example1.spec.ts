import {test,expect} from 'playwright/test';

test.describe('Account Management Suite', () => {
test.beforeAll(async () => {

console.log('beforeAll: Seeding test account via REST API...');
});

test.beforeEach(async ({ page }) => {
await page.goto('https://www.qaguides.com/login');
await page.fill('#username', 'qa_user');

await page.fill('#password', 'SecurePass123!');
await page.click('button[type="submit"]');
});

test.afterEach(async ({ page }, testInfo) => {
if (testInfo.status !== testInfo.expectedStatus) {
console.log(`afterEach: Test '${testInfo.title}' failed! Status: ${testInfo.status}`);
}
});

test.afterAll(async () => {
console.log('afterAll: Purging seeded test data via REST API...');
});

test('Verify Account Dashboard Overview', async ({ page }) => {
await expect(page.locator('.dashboard')).toBeVisible();
});

test('Verify User Settings Panel', async ({ page }) => {
await page.click('text=Settings');
await expect(page).toHaveURL(/.*settings/);
});

});