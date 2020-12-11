import { superoak } from '../../deps.js';
import { app } from '../../app.js';

// Checking that landing page loads correctly

Deno.test({
    name: "GET to / should always return HTML-document and status OK",
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/")
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false
});
