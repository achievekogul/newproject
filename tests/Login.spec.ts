import { Loginpage } from '../pages/Loginpage'
import { expect, test } from '@playwright/test'



test('to test login', async ({ page }) => {

    const login = new Loginpage(page);

    await page.goto('https://www.google.com');
    // await login.loginSteps("test");
    //  await expect(page).toHaveURL("");
    throwerror();




})

function throwerror(): never {
    throw new Error("Error occured");

}
