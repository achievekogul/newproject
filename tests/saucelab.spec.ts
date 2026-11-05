import { test, expect } from '@playwright/test';


test.skip('Save authentication', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');

    await page.locator('#password').fill('secret_sauce');

    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory/);

    // Save authentication state
    await page.context().storageState({
        path: './auth/auth.json'
    });

});



test('login functionality', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/inventory.html');

    await page.waitForLoadState('networkidle');
    await page.pause();


    const swag = await page.getByText('Swag Labs').textContent();
    console.log(swag);


});