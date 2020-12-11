import { superoak } from '../../deps.js';
import { app } from '../../app.js';

// Checking that redirect works when user not authenticated

Deno.test({
    name: "GET to /behavior/reporting/evening with no user should redirect to login", 
    async fn() {
        const testClient = await superoak(app);
		await testClient.get("/behavior/reporting/evening")
			.expect(new RegExp("Login"))
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "GET to /behavior/reporting/morning with no user should redirect to login", 
    async fn() {
        const testClient = await superoak(app);
		await testClient.get("/behavior/reporting/morning")
			.expect(new RegExp("Login"))
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "GET to /behavior/reporting with no user should redirect to login", 
    async fn() {
        const testClient = await superoak(app);
		await testClient.get("/behavior/reporting")
			.expect(new RegExp("Login"))
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "POST to /behavior/reporting with no user should redirect to login", 
    async fn() {
        let testClient = await superoak(app);
        let response = await testClient.get("/").expect(200);
        let headers = response.headers["set-cookie"];
        let cookie = headers.split(";")[0];
        testClient = await superoak(app);
        try {
          await testClient
              .post('/behavior/reporting/morning')
              .set("Cookie", cookie);
        } catch (e) {
        }
        testClient = await superoak(app);
        response = await testClient
          .get('/behavior/reporting/morning')
          .set("Cookie", cookie)
          .expect(new RegExp("Login"));
    },
    sanitizeResources: false,
    sanitizeOps: false
});