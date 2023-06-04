import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BtnFloat from "../../components/Button/BtnFloat.js";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom.js";
import BoardHeader from "../../components/Header/HeaderBoard.js";
import PetDummy from "../../dummy/PetDummy.js";

function PetUpdate() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState("");
  const [disease, setDisease] = useState("");
  const [searchparams, setsearchparams] = useSearchParams();
  const [animalGroup, setAnimalGroup] = useState("");
  const [detialAnimalGroup,setDetailAnimalGroup]=useState([]);
  useEffect(()=>{
   if(animalGroup==="강아지"){
    setDetailAnimalGroup([...PetDummy.DogBreeds.small,...PetDummy.DogBreeds.medium,...PetDummy.DogBreeds.large])
   } 
   else if(animalGroup==="고양이"){
    setDetailAnimalGroup(PetDummy.CatBreeds.고양이)
} else{
    setDetailAnimalGroup([])
   }
  },[animalGroup])

  const nav = useNavigate();
  const PetDummys = PetDummy.PetDummy.find(
    (PetDummy) => PetDummy.id === parseInt(searchparams.get("detailID"))
  );

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleBreedChange = (event) => {
    setBreed(event.target.value);
  };
  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleDiseaseChange = (event) => {
    setDisease(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div id="main">
      <div>
        <BoardHeader title="내 반려동물 정보 등록 페이지" />
      </div>
      <div id="insert_title">
        <h2>반려동물 정보 수정</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          반려동물 이름:
          <input
            className="name"
            type="text"
            value={PetDummys.name}
            onChange={handleNameChange}
          />
        </label>
        <label>
          반려동물 나이:
          <input className="age" type="number" min="0" value={PetDummys.age} />
          살
        </label>

        <label>
          반려동물 종류:
          <select
            className="animal_group"
            onChange={(event) => setAnimalGroup(event.target.value)}
          >
            {/* 기존에 선택한 것을 selected를 통해 기본 값으로 하고 싶긴한데 그러면 코드가 내 생각에는 복잡해지는 것 같아서 굳이인것 같다. */}
            <option value="" selected={false} disabled hidden>
              선택하시오
            </option>
            <option value="강아지" selected={true}>강아지</option>
            <option value="고양이">고양이</option>
          </select>
        </label>

        <label>
          반려동물 품종:
          <select>
            <option value="" selected disabled hidden>
              선택하시오
            </option>
                {detialAnimalGroup.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
          </select>
        </label>

        <label>
          반려동물 무게:
          <input
            className="weight"
            type="number"
            min="0"
            value={PetDummys.weight}
          />
          kg
        </label>
        <label>
          반려동물 질병:
          <select className="disease">
            <option value="" selected disabled hidden>
              선택하시오
            </option>
            {PetDummy.Disease.Disease.map((dis) => (
              <option key={dis} value={dis}>
                {dis}
              </option>
            ))}
          </select>
        </label>

        <div className="board_update_btn">
          <button
            type="submit"
            className="insert_btn"
            onClick={() => {
              nav(`/petinfo/detail?detailID=${PetDummys.id}`);
            }}
          >
            수정하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default PetUpdate;