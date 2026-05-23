# Git
## Git - branching
- Restore file từ Staging -> Working directory
  + git restore --staged <file_name>
  + git restore --staged .
- Restore file từ Repository -> Working directory
  + git reset HEAD~<so_commit>

- Lấy code từ server về:
  + git pull origin main

- Tạo nhánh mới:  **git branch <ten_branch>**
- Chuyển sang nhánh mới: **git checkout <ten_branch>**
- Vừa tạo nhánh mới vừa chuyển sang nhánh mới: **git checkout - <ten_nhanh>**
- Xóa branch: **git branch -D <ten_branch>**
  + Note: đứng ở nhánh khác trước khi xóa

## Git - Ignore file

- Vào trong file .gitignore và gõ như sau:
  + Khi cần ignore file cụ thể thì ghi hẳn tên file, vd: file1.txt
  + Khi cần ignore thư mục thì ghi hẳn tên thư mục, vd node_modules
  + Khi cần ignore tất cả file có extension cụ thể nào đó thì ghi extension đó, vd: .env, .log

# Javascript

## console.log
- Khi cần thêm biến vào console.log thì biến phải dùng ``
  + console.log(`Toi là ${name}`);

## Object

let user = {"name": "Alex", "age": 10}
const product = {
  "name": "Laptop",
  "price": 500,
  "isWindow": true,
  "manufacturer": {
    "name": "Acer",
    "year": 2025
  }
}
 
## Array

let student = [2, 4, 6, 8, 10]

## Function
 function <nameFunction>(){
  // code
 }



