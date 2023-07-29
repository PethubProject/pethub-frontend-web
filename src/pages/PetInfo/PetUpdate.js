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
import BtnUpdate from "../../components/Button/BtnUpdate";

function PetUpdate() {
  //0. 수정 취소시 알람, 수정 취소 추가하기.
  // const user = useRecoilValue(UserState);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getApi, putApi } = useApiHooks();
  const [petData, setPetData] = useState({
    petId: "",
    image: null,
    petName: "",
    petAge: "",
    // 추가돼야하는 코드
    // animalGroup: "",
    petBreed: "",
    petGender: "",
    petWeight: "",
    petIntroduction: "",
  });
  useEffect(() => {
    const petId = searchParams.get("detailID");
    getApi({ url: `/api/pet/${petId}` }).then((resp) => {
      console.log(resp);
      if (resp.status !== 200) {
        alert("서버 통신 실패");
        navigate("/petinfo");
      }
      const { data } = resp;
      if (data == null) {
        alert("등록된 펫 정보가 없습니다.");
        navigate("/petinfo");
      }
      // if (petData.petId !== data.ownerInfo.petId) {
      //   alert("잘못된 접속입니다.");
      //   navigate("/petinfo");
      // }
      setPetData(resp.data.data);
    });
  }, []);

  const handleBreedChange = (event) =>
    setPetData((prev) => ({
      ...prev,
      petBreed: event.target.value,
    }));

  const handleGenderChange = (event) =>
    setPetData((prev) => ({
      ...prev,
      petGender: event.target.value,
    }));

  // 1. 이미지 추가시킬 준비

  // const handleImageChange = (event) =>
  //   setPetData((prev) => ({
  //     ...prev,
  //     image: event.target.files[0],
  //   }));

  const onFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setPetData((p) => ({ ...p, [name]: value }));
  }, []);

  // 내용이 다 차있는데 포커스가 잡힘. 이유가 뭐지?
  const onUpdate = useCallback(() => {
    var ok = true;
    Object.keys(petData).map((k) => {
      const v = petData[k];
      if (isEmpty(v)) {
        const target = document.querySelector(`[name="${k}"]`);
        if (!isEmpty(target)) {
          target.focus();
          ok = false;
        }
        return false;
      }
    });
    if (!ok) {
      return false;
    }
    putApi({ url: `/api/pet/${petData.petId}`, data: petData }).then((resp) => {
      console.log(resp);
      if (resp.status === 200) {
        navigate(`/petinfo/detail?detailID=${petData.petId}`, {
          replace: true,
        });
      }
    });
  }, []);

  return (
    <LayoutUserExist>
      <div id="main">
        <BoardHeader
          title="내 반려동물 정보 등록 페이지"
          right={
            <div className="btn-wrapper">
              {/* <button className="btn">임시저장</button> */}
              <BtnUpdate onClick={onUpdate} />
            </div>
          }
        />
        <form id="pet_insert" className="pet_detail">
          {/* <label>
          반려동물 사진:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label> */}
          {/* 추후 수정 */}
          {/* {petData.image && (
          <img
            className="pet_select_image"
            src={URL.createObjectURL(petData.image)}
            alt="반려동물 사진"
            style={{ maxWidth: "300px", marginTop: "10px" }}
          />
        )} */}

          <div>
            <label>반려동물 이름: </label>
            <input
              className="petData_name"
              type="text"
              placeholder="이름"
              name="petName"
              value={petData.petName}
              onChange={onFormChange}
            />
          </div>
          <div>
            <label>반려동물 나이:</label>
            <input
              className="petData_age"
              value={petData.petAge}
              name="petAge"
              type="number"
              min="0"
              placeholder="1살미만일 경우 0살"
              onChange={onFormChange}
            />
            살
          </div>

          <div>
            <label>반려동물 성별:</label>
            <select
              className="petData_gender"
              name="petGender"
              defaultValue={petData.petGender}
              onChange={handleGenderChange}
            >
              <option value="" disabled>
                선택하시오
              </option>
              <option value="수컷">수컷</option>
              <option value="암컷">암컷</option>
              <option value="중성화 수술">중성화 수술</option>
            </select>
          </div>

          {/* 우선 반려동물은 강아지로만 한정함. */}
          {/* <label>
          반려동물 종류:
          <select className="animal_group" onChange={handleAnimalGroupChange}>
            <option value="" selected disabled>
              선택하시오
            </option>
            <option value="강아지">강아지</option>
            <option value="고양이">고양이</option>
          </select>
        </label> */}
          <div>
            <label>반려동물 품종: </label>
            <select
              name="petBreed"
              defaultChecked={petData.petBreed}
              onChange={handleBreedChange}
            >
              <option value="" disabled>
                선택하시오
              </option>

              <optgroup label="소형견">
                {PetDummy.DogBreeds.small.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </optgroup>

              <optgroup label="중형견">
                {PetDummy.DogBreeds.medium.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </optgroup>

              <optgroup label="대형견">
                {PetDummy.DogBreeds.large.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </optgroup>

              {/* {petData.animalGroup === "고양이" && (
              <optgroup label="고양이 종">
                {PetDummy.CatBreeds.고양이.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </optgroup>
            )} */}
            </select>
          </div>
          <div>
            <label>반려동물 무게: </label>
            <input
              className="petData"
              type="number"
              min="0"
              placeholder="0.5kg"
              name="petWeight"
              value={petData.petWeight}
              onChange={onFormChange}
            />
            kg
          </div>

          <div>
            <label>내 반려동물 소개: </label>
            <input
              className="petData"
              name="petIntroduction"
              value={petData.petIntroduction}
              onChange={onFormChange}
            />
          </div>
        </form>
      </div>
    </LayoutUserExist>
  );
}

export default PetUpdate;
