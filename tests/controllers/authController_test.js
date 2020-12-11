import { superoak } from '../../deps.js';
import { app } from '../../app.js';

// Testing that GET requests to login and registration pages work

Deno.test({
    name: "GET to login should return HTML-document and status OK",
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/auth/login")
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "GET to registration should return HTML-document and status OK",
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/auth/registration")
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false
});

// Checking that wrong email or password at login returns error status

Deno.test({
    name: "POST to login with wrong email should return 401",
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/auth/login")
        .send('email=thisshouldnotexist@test.com&&password=password')
        .expect(401)
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "POST to login with wrong password should return 401",
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/auth/login")
        .send('email=test@test.fi&&password=password')
        .expect(401)
    },
    sanitizeResources: false,
    sanitizeOps: false
});

// Checking that trying to register with existing email returns error code

Deno.test({
    name: "POST to registration with email already in use should return 401",
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/auth/registration")
        .send('email=test@test.fi&&password=password&&verification=password')
        .expect(401)
    },
    sanitizeResources: false,
    sanitizeOps: false
});

// Checking that trying to register with non-matching passwords returns error code

Deno.test({
    name: "POST to registration with email already in use should return 401",
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/auth/registration")
        .send('email=testingtestingtesting@test.fi&&password=password&&verification=password2')
        .expect(401)
    },
    sanitizeResources: false,
    sanitizeOps: false
});