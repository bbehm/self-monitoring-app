import { superoak } from '../../deps.js';
import { app } from '../../app.js';

Deno.test({
    name: "GET request to /api/summary should return data from the past week // NOTE! // If test fails, check that there is data for the week",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/api/summary")
			.expect(200)
			.expect('Content-Type', new RegExp('application/json'));
	},
	sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "GET request to /api/summary/:year/:month should return data from that day // NOTE! // If test fails, check that there is data for the day",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/api/summary/2020/12/10")
			.expect(200)
			.expect('Content-Type', new RegExp('application/json'));
	},
	sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "Giving /api/summary/:year/:month a date formatted without zero should still work // NOTE! // If test fails, check that there is data for the day",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/api/summary/2020/12/9")
			.expect(200)
			.expect('Content-Type', new RegExp('application/json'));
	},
	sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "Testing a date with no data // NOTE! // check that there is indeed no data for the date",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/api/summary/2000/12/9")
		.expect('No data found for the selected day')	
	  	.expect(404);
	},
	sanitizeResources: false,
    sanitizeOps: false
});