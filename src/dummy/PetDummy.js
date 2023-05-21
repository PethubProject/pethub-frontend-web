const ctime = new Date();
const PetDummy = [
  {
    id: 1,
    name: "구름",
    age: 2,
    famliy:"강아지",
    breed: "말티즈",
    weight: 5.5,
    disease: "감기",    
    createdtime: ctime.toISOString(),
  },
  {
    id: 2,
    name: "우주",
    family: "고양이",
    age: 3,
    breed: "푸들",
    weight: 5,
    disease: "변비",    
    createdtime: ctime.toISOString(),
  },
];

export default PetDummy;
