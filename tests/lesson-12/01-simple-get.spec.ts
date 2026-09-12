import { test, expect } from "@playwright/test";
import { TodoApiPage } from "./03-todo.api.page";


test("Get all todo", async ({ request }) => {
	 const todoApiPage = new TodoApiPage(request);
	 const responseJson = await todoApiPage.getAll();
	 expect(responseJson.todos.length).toEqual(191);

});


test("Get single todo", async ({ request }) => {
	 const todoApiPage = new TodoApiPage(request);
	 const responseJson = await todoApiPage.getTodo(140);
	 console.log(responseJson);

	 expect(responseJson.todos.title).toContain("Todo đã cập nhật PUT");
	 expect(responseJson.todos.priority).toEqual("low");
});
