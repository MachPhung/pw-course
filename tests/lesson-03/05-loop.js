let sum = 0;
for (let i = 1; i <= 100; i++) {
  sum += i;
}
console.log(sum);

const numbers = [];
for (let i = 1; i <= 99; i += 2) {
  numbers.push(i);
}
console.log(numbers);

for (let i = 1; i <= 10; i++) {
  console.log(`user${i}@example.com`);
}

const revenues = [
  {"month": 1, "total": 100}, 
  {"month": 2, "total": 200}, 
  {"month": 3, "total": 300},
  {"month": 4, "total": 400},
  {"month": 5, "total": 500},
  {"month": 6, "total": 600},
  {"month": 7, "total": 700},
  {"month": 8, "total": 800},
  {"month": 9, "total": 900},
  {"month": 10, "total": 1000},
  {"month": 11, "total": 1100},
  {"month": 12, "total": 1200}
];

let totalRevenue = 0;
  for (let i = 0; i < revenues.length; i++) {
    totalRevenue += revenues[i].total;
  }
console.log(`Tổng doanh thu 1 năm: ${totalRevenue}`);  




  

