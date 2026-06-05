import { test } from "@playwright/test";

test("add and search list items", async ({ page }) => {
	await page.goto("https://material.playwrightvn.com/");
	await page.click('//a[text()="Bài học 4: Personal notes"]');

	const items = [
		{
			itemId: 1,
			actionName: "click",
			descriptor:
				"Hàm click dùng để thực hiện click vào các phần tử trên trang web",
		},
		{
			itemId: 2,
			actionName: "fill",
			descriptor:
				"Hàm fill đùng để điền văn bản vào các trường input hoặc textarea trên trang web",
		},
		{
			itemId: 3,
			actionName: "type",
			descriptor:
				"Hàm type dùng để nhập từng ký tự một vào phần tử, mô phỏng hành vi gõ phím thực tế của người dùng",
		},
		{
			itemId: 4,
			actionName: "hover",
			descriptor:
				"Hàm hover dùng để di chuyển con trỏ chuột đến vị trí của phần tử, kích hoạt các hiệu ứng hover",
		},
		{
			itemId: 5,
			actionName: "check",
			descriptor:
				"Hàm check dùng để đánh dấu checkbox hoặc radio button, đảm bảo phần tử ở trạng thái checked",
		},
		{
			itemId: 6,
			actionName: "uncheck",
			descriptor:
				"Hàm uncheck dùng để bỏ đánh dấu checkbox, đảm bảo phần tử ở trạng thái unchecked",
		},
		{
			itemId: 7,
			actionName: "selectOption",
			descriptor:
				"Hàm selectOption dùng để chọn một hoặc nhiều option trong thẻ select dropdown",
		},
		{
			itemId: 8,
			actionName: "press",
			descriptor:
				"Hàm press dùng để mô phỏng việc nhấn phím bàn phím như Enter, Tab, Escape hoặc các phím khác",
		},
		{
			itemId: 9,
			actionName: "dblclick",
			descriptor:
				"Hàm bdlclick dùng để thực hiện double click (nhấp đúp chuột) vào phần tử trên trang web",
		},
		{
			itemId: 10,
			actionName: "dragAndDrop",
			descriptor:
				"Hàm dragAndDrop dùng để kéo một phần tử từ vị trí nguồn và thả vào vị trí đích trên trang web",
		},
	];

	for (const item of items) {
		await page.locator('//input[@id="note-title"]').fill(item.actionName);
		await page.locator('//textarea[@id="note-content"]').fill(item.descriptor);
		const buttonLocator = page.locator('//button[@id="add-note"]');
		await buttonLocator.click();
	}

	await page.locator('//input[@id="search"]').fill("một hoặc nhiều");
});
