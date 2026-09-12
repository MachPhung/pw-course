class LoginPage {
	usernameLoc: string;
	passwordLoc: string;
	rememberMeLoc: string;
	btnLoginLoc: string;

	constructor(
		usernameLoc: string,
		passwordLoc: string,
		rememberMeLoc: string,
		btnLoginLoc: string,
	) {
		this.usernameLoc = usernameLoc;
		this.passwordLoc = passwordLoc;
		this.rememberMeLoc = rememberMeLoc;
		this.btnLoginLoc = btnLoginLoc;
	}

	fillUsername(username: string) {
		console.log("Filling username: ", username);
	}
	fillPassword(password: string) {
		console.log("Filling password: ", password);
	}
	clickRememberMe() {
		console.log("Clicking remember me checkbox");
	}

	clickBtnLogin() {
		console.log("Clicking login button");
	}
}

class DashboardPage extends LoginPage {
	headingLoc: string;

	constructor(
		headingLoc: string,
		usernameLoc: string,
		passwordLoc: string,
		rememberMeLoc: string,
		btnLoginLoc: string,
	) {
		super(usernameLoc, passwordLoc, rememberMeLoc, btnLoginLoc);
		this.headingLoc = headingLoc;
	}
}

const dashboardPageObj = new DashboardPage("1", "2", "3", "4", "5");
dashboardPageObj.fillUsername("Phung");

const loginPageObj = new LoginPage(
	"//input[@id='username']",
	"//input[@id='password']",
	"//input[@id='rememberMe']",
	"//button[@id='loginBtn']",
);
