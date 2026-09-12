import { Page } from "@playwright/test";

export class MyLoginPage {
  page: Page;
  logoXpath: string = "//div[@id='login']//a[text()='Powered by WordPress']";
  usernameXpath: string = "//input[@id='user_login']";
  passwordXpath: string = "//input[@id='user_pass']";
  rememberMeXpath: string = "//input[@id='rememberme']";
  loginBtnXpath: string = "//input[@id='wp-submit']";

  constructor(page: Page) {
    this.page = page;
  }

  async fillUsername(username: string) {
    await this.page.locator(this.usernameXpath).fill(username);
  }
  async fillPassword(password: string) {
    await this.page.locator(this.passwordXpath).fill(password);
  }
  clickRememberMe() {
    console.log("Clicking remember me checkbox");
  } 
  async clickBtnLogin() {
    await this.page.locator(this.loginBtnXpath).click();
  }
}