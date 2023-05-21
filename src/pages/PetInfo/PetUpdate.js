import React, { useState } from "react";
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

  const nav = useNavigate();
  const PetDummys = PetDummy.find(
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
        <input className="name" type="text" placeholder={PetDummys.name} />
      </label>
      <label>
        반려동물 나이:
        <input className="age" type="number" min="0" placeholder={PetDummys.age} />
      살
      </label>
      <label>
        반려동물 품종:
        <select className="breed">
          <optgroup label="소형견">
        <option value="" selected disabled hidden>선택하시오</option>
        <option value="말티즈">말티즈</option>
        <option value="포메라니안">포메라니안</option>
        <option value="치와와">치와와</option>
        <option value="비글">비글</option>
        </optgroup>
        <optgroup label="중형견">
        <option value="비숑프리제">비숑프리제</option>
        <option value="사모예드">사모예드</option>
        <option value="웰시코기">웰시코기</option>
        <option value="시베리안 허스키">시베리안 허스키</option>
        </optgroup>
        <optgroup label="대형견">
        <option value="블러드하운드">블러드하운드</option>
        <option value="리트리버">리트리버</option>
        <option value="하운드">하운드</option>
        <option value="셰퍼드">셰퍼드</option>
        </optgroup>
        </select>
      </label>
      <label>
        반려동물 무게:
        <input className="weight" type="number" min="0" placeholder={PetDummys.weight} />
      kg
      </label>
      <label>
        반려동물 질병:
        <select className="disease">
        <option value="" selected disabled hidden>선택하시오</option>
        <option value="알수없음">알수없음</option>
        <option value="없음">없음</option>
        <option value="피부질병">피부질병</option>
        <option value="소화기질병">소화기질병</option>
        <option value="눈질병">눈 질병</option>
        <option value="심장">심장질병</option>
        <option value="외상">외상</option>
        <option value="구토">구토</option>
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
