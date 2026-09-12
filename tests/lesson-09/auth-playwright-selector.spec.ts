import { test, expect } from "@playwright/test";

test.describe("AUTH-Authentication", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
	});
	test.afterEach(async ({ page }) => {
		await page.close();
	});

	test("@AUTH_001: Login fail", async ({ page }) => {
		await test.step("Input invalid username and password", async () => {
			const usernameField = page.getByLabel("Username or Email Address");
			const passwordField = page.getByRole("textbox", { name: "Password" });
			await usernameField.fill("invalid_user");
			await passwordField.fill("invalid_password");
			await expect(usernameField).toHaveValue("invalid_user");
			await expect(passwordField).toHaveValue("invalid_password");
		});
		await test.step("Click on Login button", async () => {
			await page.getByRole("button", { name: "Log In" }).click();
		});

		const errorMessage = page.getByText(
			/Error: The username invalid_user is not registered on this site. If you are unsure of your username, try your email address instead./,
		);
		await expect(errorMessage).toBeVisible();
		await expect(errorMessage).toContainText(
			`Error: The username invalid_user is not registered on this site. If you are unsure of your username, try your email address instead.`,
		);
	});

	test("@AUTH_002: Login success", async ({ page }) => {
		await test.step("Input valid username and password", async () => {
			const usernameField = page.getByLabel("Username or Email Address");
			const passwordField = page.getByRole("textbox", { name: "Password" });
			await usernameField.fill("betterbytes.academy.admin");
			await passwordField.fill("StrongPass@BetterBytesAcademy");
		});
		await test.step("Click on Login button", async () => {
			await page.getByRole("button", { name: "Log In" }).click();
		});
		await expect(page).toHaveURL(/.*wp-admin/);
		await expect(page.getByRole("heading", { name: "Dashboard" })).toHaveText(
			"Dashboard",
		);
	});
});
