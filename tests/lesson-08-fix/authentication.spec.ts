import { test, expect } from "@playwright/test";

test.describe("AUTH - Authentication", async () => {
	test.beforeEach(async ({ page }) => {
		await test.step("Navigate to the login page", async () => {
			await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
		});
	});

	test("@AUTH_001 -Login fail", async ({ page }) => {
		// Arrange
		const testData = {
			username: "invalidUsername",
			password: "invalidPassword",
		};

		const locators = {
			username: page.locator("//input[@id='user_login']"),
			password: page.locator("//input[@id='user_pass']"),
			btnLogin: page.locator("//input[@id='wp-submit']"),
			loginErrorNotice: page.locator("//div[@id='login_error']"),
		};
		await test.step("Input invalid username, password", async () => {
			// Act
			await locators.username.fill(testData.username);
			await locators.password.fill(testData.password);
			await locators.btnLogin.click();

			// Assert
			await expect(locators.username).toHaveValue(testData.username);
			await expect(locators.password).toHaveValue(testData.password);
		});

		await test.step("Verify login failure", async () => {
			//Arrange
			const errorMessage = `Error: The username ${testData.username} is not registered on this site. If you are unsure of your username, try your email address instead.`;

			//Act
			await locators.btnLogin.click();
			//Assert
			await expect(locators.loginErrorNotice).toHaveText(errorMessage);
		});
	});

	test("@AUTH_002 -Login success", async ({ page }) => {
		const testData = {
			username: "betterbytes.academy.admin",
			password: "StrongPass@BetterBytesAcademy",
		};

		const locators = {
			loginPage: {
				username: page.locator("//input[@id='user_login']"),
				password: page.locator("//input[@id='user_pass']"),
				btnLogin: page.locator("//input[@id='wp-submit']"),
			},
			dashboardPage: {
				dashboardHeader: page.locator("(//h1)[1]"),
				atGalence: page.locator("//h2[text()='At a Glance']"),
				activity: page.locator("//h2[text()='Activity']"),
			},
		};

		const loginPage = locators.loginPage;
		await test.step("Input valid username, password", async () => {
			// Act
			await loginPage.username.fill(testData.username);
			await loginPage.password.fill(testData.password);
			await loginPage.btnLogin.click();

			// Assert
			await expect(loginPage.username).toHaveValue(testData.username);
			await expect(loginPage.password).toHaveValue(testData.password);
		});

		await test.step("Verify login success", async () => {
			//Arrange
			const dashboardPage = locators.dashboardPage;

			//Act
			await loginPage.btnLogin.click();
			//Assert
			await expect(page).toHaveURL(/wp-admin/);
			await expect(dashboardPage.dashboardHeader).toBeVisible();
			await expect(dashboardPage.atGalence).toBeVisible();
			await expect(dashboardPage.activity).toBeVisible();
		});
	});
});
