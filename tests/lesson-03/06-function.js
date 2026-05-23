function multiply(a, b) {
  return a * b;
}

console.log(multiply(2, 3)); 
console.log(multiply(4, 5));

function findMin(x,y,z){
  return Math.min(x,y,z);
}

console.log(findMin(5, 10, 3)); 
console.log(findMin(-1, -5, -3));


function getTopStudent(students, threshold) {
  let topStudent = [];

  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    if (student.score >= threshold) {
      topStudent.push(student.name);
    }
  }

  return topStudent;
}
students = [
  { name: "Alice", score: 8.5 },
  { name: "Bob", score: 9.5 },
  { name: "Charlie", score: 7 },
  { name: "David", score: 10 }
];
console.log(getTopStudent(students, 9));

function calculateInterest(principal, rate, years){
  let total = principal + (principal * rate * years)/100;
  return total;
}
console.log(calculateInterest(10000000, 8, 2));
