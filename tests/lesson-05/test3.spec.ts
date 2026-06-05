import { test } from "@playwright/test";

test("add and deletetodo items", async ({ page }) => {
	await page.goto("https://material.playwrightvn.com/");
	await page.click('//a[text()="Bài học 3: Todo page"]');
	const todoItems = [];
	for (let i = 1; i <= 100; i++) {
		const itemText = `Todo ${i}`;
		await page.locator("//input[@id='new-task']").fill(itemText);
		await page.locator("//button[@id='add-task']").click();
		todoItems.push(itemText);
	}

	page.on("dialog", (dialog) => dialog.accept());

	for (let i = 1; i <= 100; i++) {
		if (i % 2 !== 0) {
			await page
				.locator(`//li[.//span[text()="Todo ${i}"]]//button[text()="Delete"]`)
				.click();
		}
	}
});
