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

    page.evaluate(() => {

        window.localStorage.setItem('auth token', ' ');
        window.localStorage.setItem('userTheme', 'dark');

    });

 Promise.all([
page.waitForEvent('download')

 ])
    const swag = await page.getByText('Swag Labs').textContent();
    console.log(swag);

    const tear={
        name:'john',
        id:20

    }

console.log(tear['name']);
console.log(Object.keys(tear))
});

const charcounts: {[key:string]:number}={}

let name: string='test';

for (const char of name){
    charcounts[char]=(charcounts[char]||0)+1;
}
console.log(charcounts);
