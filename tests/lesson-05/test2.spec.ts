import { test } from "@playwright/test";

test("add product to cart", async ({ page }) => {
	await page.goto("https://material.playwrightvn.com/");
	await page.click('//a[text()="Bài học 2: Product page"]');

	const cartItems = [
		{ productId: 1, quantity: 2 },
		{ productId: 2, quantity: 3 },
		{ productId: 3, quantity: 1 },
	];
	for (const item of cartItems) {
		const buttonLocator = page.locator(
			`button.add-to-cart[data-product-id="${item.productId}"]`,
		);
		for (let i = 0; i < item.quantity; i++) {
			await buttonLocator.click();
		}
	}
});
