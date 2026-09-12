import {test} from '@playwright/test';

test('Login sucess', async ({page}) => {
  await test.step('Goto login page', async () =>{
    await page.goto("https://pw-practice-dev.playwrightvn.com/wp-login.php");
  });

  await test.step('Fill username', async () =>{
    await page.locator("//input[@id='user_login']").fill("betterbytes.academy.admin");
  });

  await test.step('Fill password', async () => {
    await page.locator("//input[@id='user_pass']").fill("StrongPass@BetterBytesAcademy");
  });

  await test.step('Click login button', async () => {
    await page.locator("//input[@id='wp-submit']").click();
  });
})