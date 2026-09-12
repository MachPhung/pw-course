import { test, expect } from "@playwright/test";

test("Get all todo", async ({ request }) => {
	const response = await request.get(
		"https://material.playwrightvn.com/api/todo-app/v1/todos.php",
	);
  const responseJson = await response.json();
  console.log(responseJson.todos.length);

	expect(response.status()).toBe(200);
	expect(responseJson.todos.length).toEqual(189);
});
