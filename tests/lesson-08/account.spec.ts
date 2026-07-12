import { test, expect } from "@playwright/test";

test.describe("ACCOUNT - Account", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");

		await test.step("Input valid username and password", async () => {
			const usernameField = page.locator("//input[@id='user_login']");
			const passwordField = page.locator("//input[@id='user_pass']");
			await usernameField.fill("betterbytes.academy.admin");
			await passwordField.fill("StrongPass@BetterBytesAcademy");
		});

		await test.step("Click on Login button", async () => {
			await page.locator("//input[@id='wp-submit']").click();
			// Ensure login completed
			await expect(page).toHaveURL(/.*wp-admin/, { timeout: 50_000 });
		});
	});

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

			await usernameField.fill("E101_phung");
			await emailField.fill("phung.mach2407@example.com");
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
			await usernameField.fill("E101_phung");
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
				subscriber: ["Dashboard", "Profiles"],
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
			await usernameField.fill("betterbytes.academy.admin");
			await passwordField.fill("StrongPass@BetterBytesAcademy");
			await page.locator("//input[@id='wp-submit']").click();
			await expect(page).toHaveURL(/.*wp-admin/, { timeout: 50_000 });
		});

		await test.step("Delete new user", async () => {
			const usersMenu = page.locator(
				"//div[@id='adminmenuwrap']//li[@id='menu-users']/a[@href='users.php']/div[@class='wp-menu-name']",
			);
			await usersMenu.click();
			const pageHeader = page.locator(
				'//div[@id="wpcontent"]/div[@id="wpbody"]/div[@id="wpbody-content"]/div[@class="wrap"]/h1',
			);
			await expect(pageHeader).toContainText("Users");

			const userRow = page.locator(
				'//table[@class="wp-list-table widefat fixed striped users"]/tbody/tr/td[@data-colname="Username"]/strong/a[text()="E101_phung"]/ancestor::tr',
			);
			//await expect(userRow).toBeVisible({ timeout: 50_000 });
			await userRow
				.locator(
					'xpath=.//td[@data-colname="Username"]//strong//a[text()="E101_phung"]',
				)
				.hover({timeout: 5000});
			const deleteLink = userRow.locator('xpath=.//span[@class="delete"]/a');
			await deleteLink.click();
			await expect(page).toHaveURL(/.*user-delete.php/, { timeout: 50_000 });
			const confirmDeleteButton = page.locator(
				'//input[@id="submit"][@value="Confirm Deletion"]',
			);
			await confirmDeleteButton.click();
			await expect(page.locator('//div[@id="message"]/p')).toContainText(
				"User deleted",
			);
		});
	});


	test("@ACC_001: Create account with subscriber permission", async ({ page }) => {
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

			await usernameField.fill("E101_phung_subscriber");
			await emailField.fill("phung.mach@example.com");
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
			await usernameField.fill("E101_phung_subscriber");
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
				subscriber: ["Dashboard", "Profiles"],
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
			await usernameField.fill("betterbytes.academy.admin");
			await passwordField.fill("StrongPass@BetterBytesAcademy");
			await page.locator("//input[@id='wp-submit']").click();
			await expect(page).toHaveURL(/.*wp-admin/, { timeout: 50_000 });
		});

		await test.step("Delete new user", async () => {
			const usersMenu = page.locator(
				"//div[@id='adminmenuwrap']//li[@id='menu-users']/a[@href='users.php']/div[@class='wp-menu-name']",
			);
			await usersMenu.click();
			const pageHeader = page.locator(
				'//div[@id="wpcontent"]/div[@id="wpbody"]/div[@id="wpbody-content"]/div[@class="wrap"]/h1',
			);
			await expect(pageHeader).toContainText("Users");

			const userRow = page.locator(
				'//table[@class="wp-list-table widefat fixed striped users"]/tbody/tr/td[@data-colname="Username"]/strong/a[text()="E101_phung_subscriber"]/ancestor::tr',
			);
			await expect(userRow).toBeVisible({ timeout: 50_000 });
			await userRow
				.locator(
					'xpath=.//td[@data-colname="Username"]//strong//a[text()="E101_phung_subscriber"]',
				)
				.hover({timeout: 5000});
			const deleteLink = userRow.locator('xpath=.//span[@class="delete"]/a');
			await deleteLink.click();
			await expect(page).toHaveURL(/.*user-delete.php/, { timeout: 50_000 });
			const confirmDeleteButton = page.locator(
				'//input[@id="submit"][@value="Confirm Deletion"]',
			);
			await confirmDeleteButton.click();
			await expect(page.locator('//div[@id="message"]/p')).toContainText(
				"User deleted",
			);
		});
	});


});
