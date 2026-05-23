let car = {
    make: "Toyota",
    model: "Corolla",
    year: 2021,
}

console.log(car.year); 

let person = {
  name: "Hana",
  address: {
    street: "Doan Van Bo",
    city: "Ho Chi Minh",
    country: "Vietnam",
  },
}
console.log(person.address.street);

let student = {
  name: "John",
  grades: {
    math: 10,
    english: 9
  }
}
console.log(student.grades["math"]);

let settings = {
  volume: 5,
  brightness: 10
}

settings.volume = 7;
console.log(settings);

let bike = {
  brand: "Giant",
  type: "Mountain",
  year: 2020
}
bike.color = "Red";
console.log(bike);

let employee = {
  name: "Alice",
  age: 30
}
delete employee.age;
console.log(employee);


const school = {classA:["An", "Binh", "Chau"], classB:["Dao", "Huong", "Giang"]};
console.log(school);


