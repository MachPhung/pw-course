import { test, expect } from "@playwright/test";

function generateRandomString(length: number): string {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

const USERNAME = `E101_phung_${generateRandomString(2)}`;
const EMAIL = `phung.mach${generateRandomString(2)}@example.com`;

const VALID_USERNAME = "betterbytes.academy.admin";
const VALID_PASSWORD = "StrongPass@BetterBytesAcademy";
const WEBSITE_URL = "https://pw-practice-dev.playwrightvn.com/wp-admin";

test.describe("ACCOUNT - Account", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(WEBSITE_URL, { timeout: 50_000 });

		await test.step("Input valid username and password", async () => {
			const usernameField = page.locator("//input[@id='user_login']");
			const passwordField = page.locator("//input[@id='user_pass']");
			await usernameField.fill(VALID_USERNAME);
			await passwordField.fill(VALID_PASSWORD);
		});

		await test.step("Click on Login button", async () => {
			await page.locator("//input[@id='wp-submit']").click();

			await expect(page).toHaveURL(/.*wp-admin/, { timeout: 50_000 });
		});
	});
	// Test case: Create account with editor permission

	test("@ACC_001: Create account with editor permission", async ({ page }) => {
		await test.step("Click on Users menu", async () => {
			const usersMenu = page.locator(
				"//div[@id='adminmenuwrap']//li[@id='menu-users']/a[@href='users.php']/div[@class='wp-menu-name']",
			);
			await usersMenu.click();
			const pageHeader = page.locator(
				'//div[@id="wpcontent"]/div[@id="wpbody"]/div[@id="wpbody-content"]/div[@class="wrap"]/h1',
			);
			await expect(pageHeader).toContainText("Users");

			const addNewButton = page.locator(
				'//div[@id="wpcontent"]/div[@id="wpbody"]/div[@id="wpbody-content"]/div[@class="wrap"]/a[@class="page-title-action"]',
			);
			await expect(addNewButton).toBeEnabled();

			await addNewButton.click();
		});

		await test.step("Add New User with editor permission", async () => {
			const usernameField = page.locator('//input[@id="user_login"]');
			const emailField = page.locator('//input[@id="email"]');
			const firstNameField = page.locator('//input[@id="first_name"]');
			const lastNameField = page.locator('//input[@id="last_name"]');
			const passwordField = page.locator('//input[@id="pass1"]');
			const roleDropdown = page.locator('//select[@id="role"]');
			const addNewUserButton = page.locator('//input[@id="createusersub"]');

			await usernameField.fill(USERNAME);
			await emailField.fill(EMAIL);
			await passwordField.clear();
			await passwordField.fill("sfhhm^ObELl*1nJS(hGy3Vt6");
			await firstNameField.fill("E101");
			await lastNameField.fill("Phung");
			await roleDropdown.selectOption("editor");
			await addNewUserButton.click();

			await expect(page.locator('//div[@id="message"]/p')).toContainText(
				"New user created",
			);
		});

		// Test case: Logout and login with new user

		await test.step("Logout and login with new user", async () => {
			const accountMenu = page.locator(
				"//li[@id='wp-admin-bar-my-account']/child::a",
			);
			await accountMenu.hover();

			const logoutLink = page.locator(
				"//li[@id='wp-admin-bar-logout']/child::a",
			);
			await expect(logoutLink).toBeVisible({ timeout: 10_000 });
			await logoutLink.click({ timeout: 50_000 });
			await expect(page).toHaveURL(/.*wp-login.php/, { timeout: 10_000 });

			const usernameField = page.locator("//input[@id='user_login']");
			const passwordField = page.locator("//input[@id='user_pass']");
			await usernameField.fill(USERNAME);
			await passwordField.fill("sfhhm^ObELl*1nJS(hGy3Vt6");
			await page.locator("//input[@id='wp-submit']").click();
			await expect(page).toHaveURL(/.*wp-admin/, { timeout: 50_000 });

			const permission = {
				editor: [
					"Dashboard",
					"Posts",
					"Media",
					"Pages",
					"Comments 00 Comments in moderation",
					"Profile",
					"Tools",
				],
				subscriber: ["Dashboard", "Profile"],
				administrator: [
					"Dashboard",
					"Posts",
					"Media",
					"Pages",
					"Comments",
					"Appearance",
					"Plugins",
					"Users",
					"Tools",
					"Settings",
				],
			};

			const permissionMenu = page.locator("//div[@id='adminmenuwrap']");
			await expect(permissionMenu).toBeVisible({ timeout: 50_000 });
			const menuItems = page.locator(
				"//div[@id='adminmenuwrap']//ul[@id='adminmenu']//li[contains(@id, 'menu-dashboard') or contains(@id, 'menu-posts') or contains(@id, 'menu-media') or contains(@id, 'menu-pages') or contains(@id, 'menu-comments') or contains(@id, 'menu-appearance') or contains(@id, 'menu-plugins') or contains(@id, 'menu-users') or contains(@id, 'menu-tools') or contains(@id, 'menu-settings')]//div[@class='wp-menu-name']",
			);
			const menuTexts = await menuItems.allTextContents();
			console.log("menuTexts:", menuTexts);
			console.log("Expected editor permissions:", permission.editor);
			expect(menuTexts).toEqual(permission.editor);
		});

		// Test case: Logout new user then login with admin account

		await test.step("Logout new user then login with admin account", async () => {
			const accountMenu = page.locator(
				"//li[@id='wp-admin-bar-my-account']/child::a",
			);
			await accountMenu.hover();

			const logoutLink = page.locator(
				"//li[@id='wp-admin-bar-logout']/child::a",
			);
			await expect(logoutLink).toBeVisible();
			await logoutLink.click();
			await expect(page).toHaveURL(/.*wp-login.php/, { timeout: 50_000 });

			const usernameField = page.locator("//input[@id='user_login']");
			const passwordField = page.locator("//input[@id='user_pass']");
			await usernameField.fill(VALID_USERNAME);
			await passwordField.fill(VALID_PASSWORD);
			await page.locator("//input[@id='wp-submit']").click();
			await expect(page).toHaveURL(/.*wp-admin/, { timeout: 50_000 });
		});

		// Test case: Delete new user

		await test.step("Delete new user", async () => {
			const usersMenu = page.locator(
				"//div[@id='adminmenuwrap']//li[@id='menu-users']/a[@href='users.php']/div[@class='wp-menu-name']",
			);
			await usersMenu.click();
			const pageHeader = page.locator(
				'//div[@id="wpcontent"]/div[@id="wpbody"]/div[@id="wpbody-content"]/div[@class="wrap"]/h1',
			);
			await expect(pageHeader).toContainText("Users");

			// Search for the user row based on the username and locate the delete link
			await page.locator('//input[@id="user-search-input"]').fill(USERNAME);
			await page.locator('//input[@id="search-submit"]').click();

			// Wait for the user row to be visible before proceeding
			await page.waitForTimeout(2000);
			// Locate the user row based on the username and find the delete link
			await page.waitForSelector(
				`//table[@class="wp-list-table widefat fixed striped users"]/tbody/tr/td[@data-colname="Username"]/strong/a[text()="${USERNAME}"]/ancestor::tr`,
				{ timeout: 50_000 },
			);
			// Delete the user by clicking the delete link and confirming the deletion
			await page
				.locator(
					`//table[@class="wp-list-table widefat fixed striped users"]/tbody/tr/td[@data-colname="Username"]/strong/a[text()="${USERNAME}"]/ancestor::tr//span[@class="delete"]/a`,
				)
				.click();
			await expect(page).toHaveURL(/.*user-delete.php/, { timeout: 50_000 });
			await page
				.locator('//input[@id="submit"][@value="Confirm Deletion"]')
				.click();
			// Verify that the user deletion message is displayed
			await expect(page.locator('//div[@id="message"]/p')).toContainText(
				"User deleted",
			);
		});
	});

	// Test case: Create account with subscriber permission

	test("@ACC_002: Create account with subscriber permission", async ({
		page,
	}) => {
		await test.step("Click on Users menu", async () => {
			const usersMenu = page.locator(
				"//div[@id='adminmenuwrap']//li[@id='menu-users']/a[@href='users.php']/div[@class='wp-menu-name']",
			);
			await usersMenu.click();
			const pageHeader = page.locator(
				'//div[@id="wpcontent"]/div[@id="wpbody"]/div[@id="wpbody-content"]/div[@class="wrap"]/h1',
			);
			await expect(pageHeader).toContainText("Users");

			const addNewButton = page.locator(
				'//div[@id="wpcontent"]/div[@id="wpbody"]/div[@id="wpbody-content"]/div[@class="wrap"]/a[@class="page-title-action"]',
			);
			await expect(addNewButton).toBeEnabled();

			await addNewButton.click();
		});

		await test.step("Add New User with subscriber permission", async () => {
			const usernameField = page.locator('//input[@id="user_login"]');
			const emailField = page.locator('//input[@id="email"]');
			const firstNameField = page.locator('//input[@id="first_name"]');
			const lastNameField = page.locator('//input[@id="last_name"]');
			const passwordField = page.locator('//input[@id="pass1"]');
			const roleDropdown = page.locator('//select[@id="role"]');
			const addNewUserButton = page.locator('//input[@id="createusersub"]');

			await usernameField.fill(USERNAME);
			await emailField.fill(EMAIL);
			await passwordField.clear();
			await passwordField.fill("sfhhm^ObELl*1nJS(hGy3Vt6");
			await firstNameField.fill("E101");
			await lastNameField.fill("Phung");
			await roleDropdown.selectOption("subscriber");
			await addNewUserButton.click();

			await expect(page.locator('//div[@id="message"]/p')).toContainText(
				"New user created",
			);
		});

		// Test case: Logout and login with new user

		await test.step("Logout and login with new user", async () => {
			const accountMenu = page.locator(
				"//li[@id='wp-admin-bar-my-account']/child::a",
			);
			await accountMenu.hover();

			const logoutLink = page.locator(
				"//li[@id='wp-admin-bar-logout']/child::a",
			);
			await expect(logoutLink).toBeVisible({ timeout: 10_000 });
			await logoutLink.click({ timeout: 50_000 });
			await expect(page).toHaveURL(/.*wp-login.php/, { timeout: 10_000 });

			const usernameField = page.locator("//input[@id='user_login']");
			const passwordField = page.locator("//input[@id='user_pass']");
			await usernameField.fill(USERNAME);
			await passwordField.fill("sfhhm^ObELl*1nJS(hGy3Vt6");
			await page.locator("//input[@id='wp-submit']").click();
			await expect(page).toHaveURL(/.*wp-admin/, { timeout: 50_000 });

			const permission = {
				editor: [
					"Dashboard",
					"Posts",
					"Media",
					"Pages",
					"Comments 00 Comments in moderation",
					"Profile",
					"Tools",
				],
				subscriber: ["Dashboard", "Profile"],
				administrator: [
					"Dashboard",
					"Posts",
					"Media",
					"Pages",
					"Comments",
					"Appearance",
					"Plugins",
					"Users",
					"Tools",
					"Settings",
				],
			};

			const permissionMenu = page.locator("//div[@id='adminmenuwrap']");
			await expect(permissionMenu).toBeVisible({ timeout: 50_000 });
			const menuItems = page.locator(
				"//div[@id='adminmenuwrap']//ul[@id='adminmenu']//li[contains(@id, 'menu-dashboard') or contains(@id, 'menu-posts') or contains(@id, 'menu-media') or contains(@id, 'menu-pages') or contains(@id, 'menu-comments') or contains(@id, 'menu-appearance') or contains(@id, 'menu-plugins') or contains(@id, 'menu-users') or contains(@id, 'menu-tools') or contains(@id, 'menu-settings')]//div[@class='wp-menu-name']",
			);
			const menuTexts = await menuItems.allTextContents();
			console.log("menuTexts:", menuTexts);
			console.log("Expected subscriber permissions:", permission.subscriber);
			expect(menuTexts).toEqual(permission.subscriber);
		});

		await test.step("Logout new user then login with admin account", async () => {
			const accountMenu = page.locator(
				"//li[@id='wp-admin-bar-my-account']/child::a",
			);
			await accountMenu.hover();

			const logoutLink = page.locator(
				"//li[@id='wp-admin-bar-logout']/child::a",
			);
			await expect(logoutLink).toBeVisible();
			await logoutLink.click();
			await expect(page).toHaveURL(/.*wp-login.php/, { timeout: 50_000 });

			const usernameField = page.locator("//input[@id='user_login']");
			const passwordField = page.locator("//input[@id='user_pass']");
			await usernameField.fill(VALID_USERNAME);
			await passwordField.fill(VALID_PASSWORD);
			await page.locator("//input[@id='wp-submit']").click();
			await expect(page).toHaveURL(/.*wp-admin/, { timeout: 50_000 });
		});

		// Test case: Delete new user

		await test.step("Delete new user", async () => {
			const usersMenu = page.locator(
				"//div[@id='adminmenuwrap']//li[@id='menu-users']/a[@href='users.php']/div[@class='wp-menu-name']",
			);
			await usersMenu.click();
			const pageHeader = page.locator(
				'//div[@id="wpcontent"]/div[@id="wpbody"]/div[@id="wpbody-content"]/div[@class="wrap"]/h1',
			);
			await expect(pageHeader).toContainText("Users");

			// Search for the user row based on the username and locate the delete link
			await page.locator('//input[@id="user-search-input"]').fill(USERNAME);
			await page.locator('//input[@id="search-submit"]').click();

			// Wait for the user row to be visible before proceeding
			await page.waitForTimeout(2000);
			// Locate the user row based on the username and find the delete link
			await page.waitForSelector(
				`//table[@class="wp-list-table widefat fixed striped users"]/tbody/tr/td[@data-colname="Username"]/strong/a[text()="${USERNAME}"]/ancestor::tr`,
				{ timeout: 50_000 },
			);
			// Delete the user by clicking the delete link and confirming the deletion
			await page
				.locator(
					`//table[@class="wp-list-table widefat fixed striped users"]/tbody/tr/td[@data-colname="Username"]/strong/a[text()="${USERNAME}"]/ancestor::tr//span[@class="delete"]/a`,
				)
				.click();
			await expect(page).toHaveURL(/.*user-delete.php/, { timeout: 50_000 });
			await page
				.locator('//input[@id="submit"][@value="Confirm Deletion"]')
				.click();
			// Verify that the user deletion message is displayed
			await expect(page.locator('//div[@id="message"]/p')).toContainText(
				"User deleted",
			);
		});
	});
});
