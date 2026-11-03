import { Loginpage } from '../pages/Loginpage';
import { test,expect } from '../fixtures/fixtures';


test('to test login', async ({ linkFeature , request}) => {

    const login = new Loginpage(linkFeature);

       linkFeature.locator('#userna,e')



})

function throwerror(): never {
    throw new Error("Error occured");

}
