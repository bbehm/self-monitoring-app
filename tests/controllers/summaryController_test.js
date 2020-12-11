import { superoak } from '../../deps.js';
import { app } from '../../app.js';
import { weekNumber, getTheDate, checkWeek, checkMonth } from '../../utils/dateFormatting.js';
import { assertEquals } from "https://deno.land/std@0.78.0/testing/asserts.ts";

// Testing that non-authenticated users are redirected

Deno.test({
    name: "GET to /behavior/summary with no user should redirect to login", 
    async fn() {
        const testClient = await superoak(app);
		await testClient.get("/behavior/summary")
			.expect(new RegExp("Login"))
    },
    sanitizeResources: false,
    sanitizeOps: false
});

// Testing functions used in summary

Deno.test({
    name: "weekNumber should return the correct year and week number for a date", 
	async fn() {
		const date = new Date('2020-12-11T11:09:58.502Z');
		assertEquals(weekNumber(date), [2020, 50]);
	},
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "getTheDate should return the correct year and week number for a date", 
	async fn() {
		const week = 50;
		const year = 2020;
		assertEquals(getTheDate(week, year), new Date('2020-12-06T22:00:00.000Z'));
	},
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "checkWeek inserts a 0 if week number is under 10", 
	async fn() {
		const week = 50;
		const week2 = 4;
		assertEquals(checkWeek(week), 50);
		assertEquals(checkWeek(week2), '04');
	},
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "checkMonth inserts a 0 if month number is under 10", 
	async fn() {
		const month = 11;
		const month2 = 6;
		assertEquals(checkMonth(month), 11);
		assertEquals(checkMonth(month2), '06');
	},
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "POST to /behavior/summary/week with no user should redirect to login", 
    async fn() {
        let testClient = await superoak(app);
        let response = await testClient.get("/").expect(200);
        let headers = response.headers["set-cookie"];
        let cookie = headers.split(";")[0];
        testClient = await superoak(app);
        try {
          await testClient
              .post('/behavior/summary/week')
              .set("Cookie", cookie);
        } catch (e) {
        }
        testClient = await superoak(app);
        response = await testClient
          .get('/behavior/summary/week')
          .set("Cookie", cookie)
          .expect(new RegExp("Login"));
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "POST to /behavior/summary/month with no user should redirect to login", 
    async fn() {
        let testClient = await superoak(app);
        let response = await testClient.get("/").expect(200);
        let headers = response.headers["set-cookie"];
        let cookie = headers.split(";")[0];
        testClient = await superoak(app);
        try {
          await testClient
              .post('/behavior/summary/month')
              .set("Cookie", cookie);
        } catch (e) {
        }
        testClient = await superoak(app);
        response = await testClient
          .get('/behavior/summary/month')
          .set("Cookie", cookie)
          .expect(new RegExp("Login"));
    },
    sanitizeResources: false,
    sanitizeOps: false
});
