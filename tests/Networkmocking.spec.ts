import { test, expect } from '@playwright/test';
import { only } from 'node:test';


test('1. Mock GET response from restful-api.dev', async ({ page }) => {


    page.on('console', msg => {
        console.log(`🌐 [Browser Console Log]: ${msg.text()}`);
    });

    console.log('--- TEST STARTED ---');


    // Intercept requests matching the objects endpoint
    await page.route('**/objects', async (route) => {

        console.log('⚡ [Route Intercepted]: Traffic caught before reaching server!');

        const mockedObjects = [
            {
                id: "mock-999",
                name: "Playwright Mock Device",
                data: { color: "Invisible", price: 0.00 }
            }
        ];

        console.log('🔄 [Fulfilling with Mock Data]:', JSON.stringify(mockedObjects, null, 2));

        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockedObjects)
        });
    });

    // Go to any blank or local page that triggers or displays the API call
    await page.goto('about:blank');

    console.log('📡 Fetching data from the application page...');

    // Execute fetch inside the browser page context to test the interception
    const responseData = await page.evaluate(async () => {
        const res = await fetch('https://api.restful-api.dev/objects');
        const data = await res.json();
        // Log this inside the browser console so page.on('console') catches it
        console.log('📥 Raw Response Received in Browser:', JSON.stringify(data[0]));
        return data;
    });

    console.log('✅ Final Result Checked in Test Assertion:', responseData[0].name);


    // Assert that our mock data was returned instead of the real server data
    expect(responseData).toEqual([
        {
            id: "mock-999",
            name: "Playwright Mock Device",
            data: { color: "Invisible", price: 0.00 }
        }
    ]);


});

test('to test route', async ({ page }) => {

    page.route('*/**/api/v1/fruits', async (route) => {
        const json = [{ name: 'red', id: 21 }];

        await route.fulfill({ json });
    });

    // Go to the page
    await page.goto('https://demo.playwright.dev/api-mocking');

    console.log('Test');


    await page.pause();
    // Assert that the Strawberry fruit is visible
    await expect(page.getByText('red')).toBeVisible();

});


test('mocking api response', async ({ page, request }) => {

    await page.route('*/**/api/v1/fruits', async (route) => {

        const response = await route.fetch();
        const json = await response.json();
        json.push({ name: 'Loquat', id: 100 });
        await route.fulfill({ response, json });
    });

    await page.goto('https://demo.playwright.dev/api-mocking');

    await page.pause();

    const element = page.getByText('Loquat', { exact: true });

    await element.scrollIntoViewIfNeeded();

    await expect(element).toBeVisible();

    await expect(element).toHaveText('Loquat');

});

test('modify headers', async ({ page }) => {

    const headers = page.route('**/api/v1/fruits', async (route) => {
        const request = route.request();
        const headers = {
            ...request.headers(),
            'x-custom-header': 'Playwright Automation',
            'x-environment': 'Testing'
        };
        await route.continue({ headers: headers });

    });

    await page.goto('https://demo.playwright.dev/api-mocking');
    await page.pause();
    await expect(page.getByText('Apple', {
        exact: true
    })).toBeVisible();
});


test('Record HAR', async ({ page }) => {
    // Replay API requests from HAR.
    // Either use a matching response from the HAR,
    // or abort the request if nothing matches.
    await page.routeFromHAR('./har/fruits.har', {
        url: '*/**/api/v1/fruits',
        update: false,
    });

    const fruitsResponse = page.waitForResponse(response => response.url().includes('/api/v1/fruits')
    );

    await page.goto('https://demo.playwright.dev/api-mocking');

    const response = await fruitsResponse;

    expect(response.status()).toBe(200);
});

test('Mock API using HAR', async ({ page }) => {

    await page.routeFromHAR('./har/fruits.har', {
        url: '**/api/v1/fruits',
        update: false,
        notFound: 'abort'
    });

    await page.pause();

    await page.goto('https://demo.playwright.dev/api-mocking');

    await expect(page.getByText('Apple', {
        exact: true
    })).toBeVisible();
});


test.only('500', async ({ page }) => {

    await page.route('**/api/v1/checkout', async (route) => {

        // Delays response by 2 seconds to simulate network lag, then returns 500 error
        await new Promise(resolve => setTimeout(resolve, 2000));

        await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ message: 'Internal Payment Processing Error' })
        });
    });
    await page.pause();
    await page.goto('https://example.com');
});