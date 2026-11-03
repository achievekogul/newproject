import { test, expect } from '@playwright/test';

let token = '';


test.skip('Fetch details from the user', async ({ page, request }) => {

    const response = await request.get('https://api.restful-api.dev/objects/ff808181a09d98f701a1a2429aae242d');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body);
})

test.skip('create user using post request', async ({ request }) => {

    const response = await request.post('https://api.restful-api.dev/objects', {
        data: {
            "name": "Apple MacBook Pro 16",
            "data": {
                "year": 2019,
                "price": 1849.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB"
            }
        }
    });

    expect(response.status()).toBe(200);
    const user = await response.json();
    console.log(user.data.year);
    expect(user).toBeDefined();
});

test.skip('create user using put request', async ({ request }) => {

    const response = await request.put('https://api.restful-api.dev/objects/ff808181a09d98f701a1a2429aae242d', {
        data: {
            "name": "Samsung",
            "data": {
                "year": 2026,
                "price": 14000.99,
                "CPU model": "GPU",
                "Hard disk size": "500GB"
            }
        }
    });

    expect(response.status()).toBe(200);
    const user = await response.json();
    console.log(user.data.year);
    expect(user).toBeDefined();
})


test.skip('patch the record', async ({ request }) => {

    await request.patch('https://api.restful-api.dev/objects/ff808181a09d98f701a1a2429aae242d', {
        data: {
            name: 'Moto',
        }
    });
});



test('post bearer token', async ({ request }) => {

    const response = await request.post('https://api.restful-api.dev/register', {


        headers: {
            'x-api-key': 'c8ef7fb5-6d52-41fc-aec7-47794f604abd'

        },
        data: {

            'email': 'kgu@exam.com',
            'password': 'securePsswor',
            'name': 'Kogu'
        }
    });

    const user = await response.json();
    token = user.token;
    console.log('Bearer Token', token);
});

test('get using authentication', async ({ request }) => {

    const response = await request.get('https://api.restful-api.dev/collections', {


        params: {
            'auth-type': 'jwt'
        },
        headers: {

            'x-api-key': 'c8ef7fb5-6d52-41fc-aec7-47794f604abd',
            'Authorization': `Bearer ${token}`,


        }
    });

    const user = await response.text();
        const json = await response.json();

    console.log(user);
    console.log(json);
});