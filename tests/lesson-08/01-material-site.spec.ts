import { test } from "@playwright/test";

test.describe("Material site", () => {
	test.beforeAll(async ({ page }) => {
		await page.goto("https://playwrightvn.com/");
	});

	test.beforeEach(async ({ page }) => {
		await test.step("Go to material page", async () => {
			await page.goto("https://material.playwrightvn.com/");
		});
	});

	test.afterEach(async ({ page }) => {
		console.log("All test are completed");
	});

	test.afterAll(async ({ page }) => {});

	test("User registration page", async ({ page }) => {
		await test.step("Click on the User registration link", async () => {
			await page.locator("//a[@href='01-xpath-register-page.html']").click();
		});
	});

	test("Product page", async ({ page }) => {
		await test.step("Click on the Product link", async () => {
			await page.locator("//a[@href='02-xpath-product-page.html']").click();
		});
	});
});
