import { test } from "@playwright/test";

test("register user", async ({ page }) => {
	await page.goto("https://material.playwrightvn.com/");
	await page.click(
		'//a[text()="Bài học 1: Register Page (có đủ các element)"]',
	);
	await page.locator('//input[@id="username"]').fill("Phung");
	await page.locator('//input[@id="email"]').fill("phung.mach@example.com");
	await page.locator('//input[@id="female"]').check();
	await page.locator('//input[@id="traveling"]').check();
	await page.locator('//select[@id="interests"]').selectOption("Science");
	await page.locator('//select[@id="country"]').selectOption("Canada");
	await page.locator("#dob").type("06/05/2000");
	await page
		.locator('//input[@id="profile"]')
		.setInputFiles("tests/lesson-05/picture/avatar.jpg");
	await page
		.locator('//textarea[@id="bio"]')
		.fill("I am a manual QA engineer with 2 years of experience in testing.");
	await page.locator('//label[text()="Subscribe"]').click();
	await page.locator('//label//span[@class="slider round"]').click();
	await page.locator('//div[@id="starRating"]').click();
	await page.locator("#customDate").type("05/06/2026");
	await page.locator('//button[@type="submit"]').click();
});
