import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BtnFloat from "../../components/Button/BtnFloat.js";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom.js";
import BoardHeader from "../../components/Header/HeaderBoard.js";
import PetDummy from "../../dummy/PetDummy.js";
import { useRecoilValue } from "recoil";
import { UserState } from "../../state/User";
import { isEmpty } from "../../components/Utils/Utils";
import LayoutUserExist from "../../components/Layout/LayoutUserExist";
import useApiHooks from "../../api/BaseApi";

/*
 // 펫 수정
    @ValidToken
    @AuthCheck(role = AuthCheck.Role.OWNER)
    @PutMapping("/api/pet/{petId}")
    public ResponseEntity<Object> updatePet(@PathVariable Long petId, @RequestBody PetRequestDto petRequestDto) {
        petService.updatePet(petId, petRequestDto);
        return ResponseEntity.ok().body(ResponseDto.of("펫 수정에 성공하였습니다"));
    }
*/

function PetUpdate() {
  const user = useRecoilValue(UserState);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getApi, putApi } = useApiHooks();
  const [petData, setPetData] = useState({
    // image: "1",
    // name: "",
    // age: "",
    // breed: "",
    // weight: "",
    // disease: "",
    // animalGroup: "",
    // detialAnimalGroup: "",
    image: null,
    petName: "",
    petAge: "",
    // 추가돼야하는 코드
    // animalGroup: "",
    petBreed: "",
    petGender: "",
    petWeight: "",
    disease: "",
    petIntroduction: "",
  });

  // const [name, setName] = useState("");
  // const [age, setAge] = useState("");
  // const [breed, setBreed] = useState("");
  // const [weight, setWeight] = useState("");
  // const [disease, setDisease] = useState("");
  // const [searchparams, setsearchparams] = useSearchParams();
  // const [animalGroup, setAnimalGroup] = useState("");
  // const [detialAnimalGroup,setDetailAnimalGroup]=useState([]);
  //   useEffect(()=>{
  //    if(animalGroup==="강아지"){
  //     setDetailAnimalGroup([...PetDummy.DogBreeds.small,...PetDummy.DogBreeds.medium,...PetDummy.DogBreeds.large])
  //    }
  //    else if(animalGroup==="고양이"){
  //     setDetailAnimalGroup(PetDummy.CatBreeds.고양이)
  // } else{
  //     setDetailAnimalGroup([])
  //    }
  //   },[animalGroup])

  // const PetDummys = PetDummy.PetDummy.find(
  //   (PetDummy) => PetDummy.id === parseInt(searchparams.get("detailID"))
  // );

  // const handleNameChange = (event) => {
  //   setName(event.target.value);
  // };

  // const handleAgeChange = (event) => {
  //   setAge(event.target.value);
  // };

  // const handleBreedChange = (event) => {
  //   setBreed(event.target.value);
  // };
  // const handleWeightChange = (event) => {
  //   setWeight(event.target.value);
  // };

  // const handleDiseaseChange = (event) => {
  //   setDisease(event.target.value);
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  // };

  useEffect(() => {
    const petId = searchParams.get("detailID");
    getApi({ url: `/api/pet/${petId}` }).then((resp) => {
      if (resp.status !== 200) {
        alert("서버 통신 실패");
        navigate("/petinfo");
      }
      const { data } = resp;
      if (data == null) {
        alert("등록된 펫 정보가 없습니다.");
        navigate("/petinfo");
      }
      if (user.petId !== data.ownerInfo.petId) {
        alert("잘못된 접속입니다.");
        navigate("/petinfo");
      }
      setPetData(resp.data);
    });
  }, []);

  // 아직 handleSubmit는 안만들었음.
  const handleSubmit = null;

  const handleBreedChange = (event) =>
    setPetData((prev) => ({
      ...prev,
      petBreed: event.target.value,
    }));

  const handleAnimalGroupChange = (event) =>
    setPetData((prev) => ({
      ...prev,
      animalGroup: event.target.value,
    }));

  const handleDiseaseChange = (event) =>
    setPetData((prev) => ({
      ...prev,
      disease: event.target.value,
    }));
    
    const handleGenderChange = (event) =>
    setPetData((prev) => ({
      ...prev,
      petGender: event.target.value,
    }));

  const handleImageChange = (event) =>
    setPetData((prev) => ({
      ...prev,
      image: event.target.files[0],
    }));

  const onFormChagne = useCallback((e) => {
    const { name, value } = e.target;
    setPetData((p) => ({ ...p, [name]: value }));
  }, []);

  const onUpdate = useCallback(() => {
    var ok = true;
    Object.keys(petData).map((k) => {
      const v = petData[k];
      if (isEmpty(v)) {
        var target = document.querySelector(`[name="${k}"]`);
        if (!isEmpty(target)) {
          target.focus();
          ok = false;
          return false;
        }
      }
    });
    if (!ok) {
      return false;
    }
    putApi({ url: `/api/pet/${petData.petId}`, data: petData }).then((resp) => {
      if (resp.status === 200) {
        navigate(`/petinfo/detail?detailID=${petData.petId}`, {
          replace: true,
        });
      }
    });
  }, []);

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
            name="petName"
            value={petData.petName}
            onChange={onFormChagne}
          />
        </label>
        <label>
          반려동물 나이:
          <input
            className="age"
            type="number"
            min="0"
            name="petAge"
            value={petData.petAge}
            onChange={onFormChagne}
          />
          살
        </label>

{/* 1. 아직 백엔드에 animal group 코드가 반영되지 않아 데이터 전달 불가. */}
        <label>
          반려동물 종류:
          <select className="animal_group" onChange={handleAnimalGroupChange}>
            <option value="" selected={false} disabled hidden>
              선택하시오
            </option>
            <option value="강아지" selected={true}>
              강아지
            </option>
            <option value="고양이">고양이</option>
          </select>
        </label>
{/* 1. 종료 */}

        <label>
          반려동물 품종:
          <select className="animal_breed" onChange={handleBreedChange}>
            <option value="" selected disabled hidden>
              선택하시오
            </option>
            {/* 추가 수정 */}
            {PetDummy.DogBreeds.small.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        {/* 나중에 이미지 클릭으로 바꾸기. */}
        <label>
          반려동물 성별:
          <select className="petData" onChange={handleGenderChange}>
            <option value="" selected disabled>
              선택하시오
            </option>
            <option value="수컷">수컷</option>
            <option value="암컷">암컷</option>
            <option value="중성화 수술">중성화 수술</option>
          </select>
        </label>

        <label>
          반려동물 무게:
          <input
            className="weight"
            type="number"
            name="petWeight"
            min="0"
            value={petData.petWeight}
            onChange={onFormChagne}
          />
          kg
        </label>
        <label>
          반려동물 질병:
          <select className="disease" onChange={handleDiseaseChange}>
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

        <label>
          내 반려동물 소개:
          <input
            className="petData"
            name="petIntroduction"
            value={petData.petIntroduction}
            onChange={onFormChagne}
          />
        </label>

        <div className="board_update_btn">
          <button type="submit" className="insert_btn" onClick={onUpdate}>
            수정하기
          </button>
        </div>

      </form>
    </div>
  );
}

export default PetUpdate;
