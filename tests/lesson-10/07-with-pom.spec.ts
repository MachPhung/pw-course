import {test} from '@playwright/test';
import { MyLoginPage } from './05-pom';

test('Login sucess', async ({page}) => {
  const loginPage  = new MyLoginPage(page);

  await test.step('Goto login page', async () =>{
    await page.goto("https://pw-practice-dev.playwrightvn.com/wp-login.php");
  });

  await test.step('Fill username', async () =>{
    await loginPage.fillUsername("betterbytes.academy.admin");
  });

  await test.step('Fill password', async () => {
    await loginPage.fillPassword("StrongPass@BetterBytesAcademy");
  });

  await test.step('Click login button', async () => {
    await loginPage.clickBtnLogin()
  });
})

test('Login fail', async ({page}) => {
  const loginPage  = new MyLoginPage(page);

  await test.step('Goto login page', async () =>{
    await page.goto("https://pw-practice-dev.playwrightvn.com/wp-login.php");
  });

  await test.step('Fill username', async () =>{
    await loginPage.fillUsername("betterbytes.academy.admin");
  });

  await test.step('Fill password', async () => {
    await loginPage.fillPassword("StrongPass@BetterBytesAcademy123");
  });

  await test.step('Click login button', async () => {
    await loginPage.clickBtnLogin()
  });
})