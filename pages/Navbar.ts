import { test, Page, Locator } from '@playwright/test';


export class Navbar {


    readonly page: Page;
    readonly navContainer: Locator;
    readonly courseLink: Locator;
    readonly logOut: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navContainer = page.locator('nav.header-nav');
        this.courseLink = this.navContainer.getByRole('link', { name: 'Courses' });
        this.logOut = this.navContainer.getByRole('button', { name: 'button' });

    }

    async logOutClick() {

        await this.logOut.click({
            force: true,
            timeout: 10000,
            button: 'right',
            modifiers: ['Control'],
            clickCount: 2

        });
    }

    async getToastMessage(){
     await this.courseLink.waitFor({state: 'visible'});

     return await this.courseLink.textContent();

    }
}
