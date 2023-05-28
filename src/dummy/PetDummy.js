const ctime = new Date();
const PetDummy = [
  {
    id: 1,
    name: "구름",
    age: 2,
    dorc:"강아지",
    breed: "말티즈",
    weight: 5.5,
    disease: "감기",    
    createdtime: ctime.toISOString(),
    image:"cloud_dog.jpg"
  },
  
  {
    id: 2,
    name: "우주",
    age: 3,
    dorc:"고양이",
    breed: "먼치킨",
    weight: 5,
    disease: "변비",    
    createdtime: ctime.toISOString(),
    image:"space_dog.png"
  },
];

const DogBreeds = {
  small: ["말티즈", "포메라니안", "치와와", "비글"],
  medium: ["비숑프리제", "사모예드", "웰시코기", "시베리안 허스키"],
  large: ["블러드하운드", "리트리버", "하운드", "셰퍼드"],
};

const CatBreeds = {
  "고양이": [
    "아비시니안",
    "먼치킨",
    "러시안 블루",
    "스코티시 폴드",
    "봄베이",
    "시암",
    "메인 쿤",
    "페르시안",
    "빙골",
    "샴",
  ],
};
const Disease= {
  "Disease": ["알수없음","없음","피부질병","소화기질병","눈질병","심장","외상","구토"],
}

export default { PetDummy, DogBreeds, CatBreeds, Disease};