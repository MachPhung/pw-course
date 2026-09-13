import { test, expect } from "@playwright/test";

test.describe("ACCOUNT - Account", async () => {
	const now = Date.now();

	const testData = {
		username: "betterbytes.academy.admin",
		password: "StrongPass@BetterBytesAcademy",

		newUser: {
			username: `phung_${now}`,
			email: `phung_${now}@example.com`,
			password: "TestPass@123",
			firstName: "Phung",
			lastName: "Mach",
			messageCreateSuccess: "New user created.",
			visibleMenus: [
				"Dashboard",
				"Posts",
				"Media",
				"Pages",
				"Comments",
				"Profile",
				"Tools",
			],
			invisibleMenus: ["Appearance", "Users", "Plugins"],
			menus: [
				{
					name: "Dashboard",
					visible: true,
				},
				{
					name: "Posts",
					visible: true,
				},
				{
					name: "Media",
					visible: true,
				},
				{
					name: "Comments",
					visible: true,
				},
				{
					name: "Profile",
					visible: true,
				},
				{
					name: "Tools",
					visible: true,
				},
				{
					name: "Appearance",
					visible: false,
				},
				{
					name: "Users",
					visible: false,
				},
				{
					name: "Plugins",
					visible: false,
				},
			]
		},
	};

	test.beforeEach(async ({ page }) => {
		const locators = {
			username: page.locator("//input[@id='user_login']"),
			password: page.locator("//input[@id='user_pass']"),
			btnLogin: page.locator("//input[@id='wp-submit']"),
			loginErrorNotice: page.locator("//div[@id='login_error']"),

			dashboard: {
				usernameMenu: page.locator(
					"//div[@class='wp-menu-name' and text()='Users']",
				),
				addUserMenu: page.locator("a[text()='Add User']"),
				addNewUserHeading: page.locator("//h1[@id='add-new-user']"),
			},
		};

		const dashboardPage = {
			atGalence: page.locator("//h2[text()='At a Glance']"),
		};

		await test.step("Navigate to the login page, login with admin user", async () => {
			await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
			await locators.username.fill(testData.username);
			await locators.password.fill(testData.password);
			await locators.btnLogin.click();

			//Assert
			await expect(page).toHaveURL(/wp-admin/);
			await expect(dashboardPage.atGalence).toBeVisible();
			await page.waitForTimeout(2000); // Wait for 2 seconds to ensure the page is fully loaded
		});

		//Hover user menu and click add user
		await test.step("Navigate to user page", async () => {
			//await expect(async () => {
			//	await locators.dashboard.usernameMenu.hover();
			//	await expect(locators.dashboard.addUserMenu).toBeVisible();
			//	await locators.dashboard.addUserMenu.click();
			// }).toPass();

			await expect(locators.dashboard.addNewUserHeading).toBeVisible();
		});
	});

	test.afterAll(async ({page}) => {
		const locators = {
			username: page.locator("//input[@id='user_login']"),
			password: page.locator("//input[@id='user_pass']"),
			btnLogin: page.locator("//input[@id='wp-submit']"),
			searchUserInput: page.locator("//input[@id='user-search-input']"),
			btnSearchUser: page.locator("//input[@id='search-submit']"),
			newUserRow: page.locator(`//td[@data-colname='Username' and text()='${testData.newUser.username}']`),
			deleteLink: page.locator(`//td[@data-colname='Username' and text()='${testData.newUser.username}']/following-sibling::td//span[@class='delete']/a[contains(text(),'Delete')]`),
			deleteUserMessage: page.locator("//div[@id='message']"),
		};

		const dashboardPage = {
			atGalence: page.locator("//h2[text()='At a Glance']"),
		};

		const deleteUserPage = {
			deleteUserHeading: page.locator("//h1[text()='Delete Users']"),
			confirmDeleteButton: page.locator("//input[@id='submit']"),
		};
		

		await test.step("Logout then login with admin user and delete the new user", async () => {
			await page.goto(
				"https://pw-practice-dev.playwrightvn.com/wp-login.php?loggedout=true&wp_lang=en_US",
			);

			await locators.username.fill(testData.username);
			await locators.password.fill(testData.password);
			await locators.btnLogin.click();

			await expect(dashboardPage.atGalence).toBeVisible();

			//Delete the new user
			await page.goto(
				"https://pw-practice-dev.playwrightvn.com/wp-admin/users.php",
			);

			await locators.searchUserInput.fill(testData.newUser.username);
			await locators.btnSearchUser.click();

			await expect(locators.newUserRow).toBeVisible();
			const deleteLink = locators.deleteLink;
			await deleteLink.click();

			await expect(deleteUserPage.deleteUserHeading).toBeVisible();
			await deleteUserPage.confirmDeleteButton.click();

			await expect(page).toHaveURL(/users.php/);
			await expect(locators.newUserRow).not.toBeVisible();
			await expect(locators.deleteUserMessage).toHaveText(/User deleted./);

		});
	});

	test("@ACC_001 -Create account with editor permissions", async ({ page }) => {
		const locators = {
			loginPage: {
				username: page.locator("//input[@id='user_login']"),
				password: page.locator("//input[@id='user_pass']"),
				btnLogin: page.locator("//input[@id='wp-submit']"),
			},

			username: page.locator("//input[@id='user_login']"),
			email: page.locator("//input[@id='email']"),
			firstName: page.locator("//input[@id='first_name']"),
			lastName: page.locator("//input[@id='last_name']"),
			password: page.locator("//input[@id='pass1']"),
			role: page.locator("//select[@id='role']"),
			btnCreateUser: page.locator("//input[@id='createusersub']"),
			messageBar: page.locator("//div[@id='message']"),
		};
		await test.step("Add new user", async () => {
			//Arrange
			const role = "Editor";
			const newUser = testData.newUser;

			//Act
			await locators.username.fill(newUser.username);
			await locators.email.fill(newUser.email);
			await locators.firstName.fill(newUser.firstName);
			await locators.lastName.fill(newUser.lastName);
			await locators.password.fill(newUser.password);
			await locators.role.selectOption(role);
			await locators.btnCreateUser.click();

			//Assert
			await expect(locators.messageBar).toContainText(
				newUser.messageCreateSuccess,
			);
		});

		await test.step("Logout and login with the new created user", async () => {
			//Thuc hien dang xuat va dang nhap lai voi user name vua tao
			await page.goto(
				"https://pw-practice-dev.playwrightvn.com/wp-login.php?loggedout=true&wp_lang=en_US",
			);

			const loginPage = locators.loginPage;
			await loginPage.username.fill(testData.newUser.username);
			await loginPage.password.fill(testData.newUser.password);
			await loginPage.btnLogin.click();

			//Assert
			await expect(page).toHaveURL(/wp-admin/);
			//Show menu cach 1
			// const visibleMenus = testData.newUser.visibleMenus;
			// for (let i = 0; i < visibleMenus.length; i++) {
			// 	const menuLocator = page.locator(
			// 		`//div[@class='wp-menu-name' and text()='${visibleMenus[i]}']`,
			// 	);
			// 	await expect(menuLocator).toBeVisible();
			// }
			// const invisibleMenus = testData.newUser.invisibleMenus;
			// for (let i = 0; i < invisibleMenus.length; i++) {
			// 	const menuLocator = page.locator(
			// 		`//div[@class='wp-menu-name' and text()='${invisibleMenus[i]}']`,
			// 	);
			// 	await expect(menuLocator).not.toBeVisible();
			// }

			//Show menu cach 2
			const menus = testData.newUser.menus;
			for (let i = 0; i < menus.length; i++) {
				const item = menus[i];
				const menuLocator = page.locator(
					`//div[@class='wp-menu-name' and text()='${item.name}']`,
				);
				if (item.visible) {
					await expect(menuLocator).toBeVisible();
				} else {
					await expect(menuLocator).not.toBeVisible();
				}
			}
		});
	});


	test("@ACC_002 -Create account with subscriber permissions", async ({ page }) => {
		const locators = {
			loginPage: {
				username: page.locator("//input[@id='user_login']"),
				password: page.locator("//input[@id='user_pass']"),
				btnLogin: page.locator("//input[@id='wp-submit']"),
			},

			username: page.locator("//input[@id='user_login']"),
			email: page.locator("//input[@id='email']"),
			firstName: page.locator("//input[@id='first_name']"),
			lastName: page.locator("//input[@id='last_name']"),
			password: page.locator("//input[@id='pass1']"),
			role: page.locator("//select[@id='role']"),
			btnCreateUser: page.locator("//input[@id='createusersub']"),
			messageBar: page.locator("//div[@id='message']"),
		};
		await test.step("Add new user", async () => {
			//Arrange
			const role = "Subscriber";
			const newUser = testData.newUser;

			//Act
			await locators.username.fill(newUser.username);
			await locators.email.fill(newUser.email);
			await locators.firstName.fill(newUser.firstName);
			await locators.lastName.fill(newUser.lastName);
			await locators.password.fill(newUser.password);
			await locators.role.selectOption(role);
			await locators.btnCreateUser.click();

			//Assert
			await expect(locators.messageBar).toContainText(
				newUser.messageCreateSuccess,
			);
		});

		await test.step("Logout and login with the new created user", async () => {
			//Thuc hien dang xuat va dang nhap lai voi user name vua tao
			await page.goto(
				"https://pw-practice-dev.playwrightvn.com/wp-login.php?loggedout=true&wp_lang=en_US",
			);

			const loginPage = locators.loginPage;
			await loginPage.username.fill(testData.newUser.username);
			await loginPage.password.fill(testData.newUser.password);
			await loginPage.btnLogin.click();

			//Assert
			await expect(page).toHaveURL(/wp-admin/);
			//Show menu cach 1
			// const visibleMenus = testData.newUser.visibleMenus;
			// for (let i = 0; i < visibleMenus.length; i++) {
			// 	const menuLocator = page.locator(
			// 		`//div[@class='wp-menu-name' and text()='${visibleMenus[i]}']`,
			// 	);
			// 	await expect(menuLocator).toBeVisible();
			// }
			// const invisibleMenus = testData.newUser.invisibleMenus;
			// for (let i = 0; i < invisibleMenus.length; i++) {
			// 	const menuLocator = page.locator(
			// 		`//div[@class='wp-menu-name' and text()='${invisibleMenus[i]}']`,
			// 	);
			// 	await expect(menuLocator).not.toBeVisible();
			// }

			//Show menu cach 2
			const menus = testData.newUser.menus;
			for (let i = 0; i < menus.length; i++) {
				const item = menus[i];
				const menuLocator = page.locator(
					`//div[@class='wp-menu-name' and text()='${item.name}']`,
				);
				if (item.visible) {
					await expect(menuLocator).toBeVisible();
				} else {
					await expect(menuLocator).not.toBeVisible();
				}
			}
		});
	});
});
