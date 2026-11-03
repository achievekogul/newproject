import { Navbar } from '../pages/Navbar';
import { test } from '@playwright/test';




test('Navbar', async ({ page }) => {
    page.goto('https://saucedemo.com');
    const nav = new Navbar(page);
    await nav.logOutClick();
    const text = nav.getToastMessage();

});