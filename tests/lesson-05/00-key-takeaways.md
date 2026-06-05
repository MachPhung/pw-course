# **Javascript**
1. Function expression
- Định nghĩa function bằng cách gán nó cho một biến

const add = function (a, b) {
  return a + b;
}

2. Arrow function
 const add = (a, b) => {
  return a + b;
 };

 Nếu chỉ có 1 dòng code có thể rút gọn cặp ngoặc nhọn
  const add = (a, b) => a + b;

# **DOM**
DOM = Document object Model
1. Selector
Có 3 loại selector thường dùng là:
- XPath
  + Dùng được trong hầu hết các trường hợp
  + Đa dạng, có khả năng tìm các phần tử khó
  + Hơi dài
  + VD: //button[normalize-space() = 'Add to cart']
- CSS selector
  + Ngắn gọn, performance cao
  + Dùng cho các trường hợp dễ tìm
  + Không linh hoạt bằng XPath
  + VD: .add-to-cart
- Playwright selector
  + Chỉ dùng riêng cho Playwright
  + Cú pháp ngắn gọn, ko phụ thuộc vào cấu trúc DOM
  + Hướng tới "giống người dùng đang nhìn thấy gì"
  + VD: page.getByText("Add to cart");

**Độ ưu tiên**
Playwright selector > CSS Selector > XPath

## XPath
Có 2 loại:
- Tuyệt đối: đi dọc theo cây DOM, bắt đầu bởi 1 dấu /
- Tương đối: tìm dựa vào đặc tính, bắt đầu bởi 2 dấu //
  + //tag name[@thuoctinh="giatri"]
=> Nên dùng XPath tương đối

## Playwright basic syntax
Automation = tương tác + verify

1. test 
import {test} from '@playwright/test';

test('<ten test>', async ({page}) => {
  // code của test
});

2. step: đơn vị nhỏ hơn test, để khai báo từng step của test case

await test.step('Ten step', async () => {
  // code here
});
------------------------
test('<ten test>', async ({page}) => {
  await test.step('Ten step', async () => {
  // code here
  });
});










