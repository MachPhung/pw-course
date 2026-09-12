import {test} from '@playwright/test';

test('Demo playwright selector', async ({page}) => {
  await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html');
  const title = await page.locator("//h1[@id='self']").textContent();
  const title2 = await page.getByRole('heading', {name: 'User Registration'}).textContent();

  await page.getByRole("checkbox", {name: "Traveling"}).check();
  await page.getByRole("checkbox", {name: "Cooking"}).check();
  await page.getByRole("radio", {name: "Male", exact: true}).click();

 

  /* await page.goto("https://material.playwrightvn.com/04-xpath-personal-notes.html");
  const title3 = await page.locator("//div[@class='container']/h1").textContent();
  const title4 = await page.getByRole('heading', {name: 'Personal Notes'}).textContent(); */
});

test('Demo playwright selector - 2', async ({page}) => {
  await page.goto('https://material.playwrightvn.com/12-dom-nested.html');
  const text = await page.getByRole("listitem").filter({hasText: "H"}).count();
  console.log(text);
});

