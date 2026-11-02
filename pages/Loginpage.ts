import { test, Page, Locator } from '@playwright/test';


export class Loginpage {


    readonly page: Page;
    readonly username: Locator;



    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('');

    }

    async loginSteps(username: string) {

        await this.username.fill(username);

    }


}
