const academyName: string = "BetterBytesAcademy";

// build-in type: string, number, boolean, null, undefined, symbol, bigint
// custom type: minh tu dinh nghia

type K18User = {
  name: string;
  age: number;
  yearOfExperience: number;
};

interface K18User2 {
  name: string;
  address: string;
  email: string;
}

const student1: K18User = {
  name: "Phong",
  age: 25,
  yearOfExperience: 3,  
};

const student2: K18User2 = {
  name: "Jane Smith",
  address: "123 Main St",
  email: "jane.smith@example.com"
};

type Gold = {
  loaiVang: string;
  giaMua: number;
  giaBan: number;
}
// Dinh nghia kieu du lieu custom:
// - ten kieu du lieu: Gold 
// - cac thuoc tinh cua kieu du lieu: loaiVang: string, giaMua: number, giaBan: number
const vang9999: Gold = {
  loaiVang: "Vang 9999",
  giaMua: 1000000,
  giaBan: 1200000
};
const vang24k: Gold = {
  loaiVang: "Vang 24k",
  giaMua: 2000000,
  giaBan: 2200000
};

///////////



