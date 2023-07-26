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
  const user = useRecoilValue(UserState);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getApi, putApi } = useApiHooks();
  const [petData, setPetData] = useState({
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

    // 이미지 추가시킬 준비

  // const handleImageChange = (event) =>
  //   setPetData((prev) => ({
  //     ...prev,
  //     image: event.target.files[0],
  //   }));

  const onFormChange = useCallback((e) => {
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

  //수정 취소시 알람, 수정 취소
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
      <form>
        <label>
          반려동물 이름:
          <input
            className="name"
            type="text"
            name="petName"
            value={petData.petName}
            onChange={onFormChange}
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
            onChange={onFormChange}
          />
          살
        </label>

        {/* 추후 강아지 이외의 종류를 추가할 때 추가하면 되는 코드 */}
        {/* <label>
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
        </label> */}

        <label>
          반려동물 품종:
          <select onChange={handleBreedChange}>
            <option value="" selected disabled hidden>
              선택하시오
            </option>
            {petData.animalGroup === "강아지" && (
              <optgroup label="소형견">
                {PetDummy.DogBreeds.small.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </optgroup>
            )}
            {petData.animalGroup === "강아지" && (
              <optgroup label="중형견">
                {PetDummy.DogBreeds.small.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </optgroup>
            )}
            {petData.animalGroup === "강아지" && (
              <optgroup label="대형견">
                {PetDummy.DogBreeds.small.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </optgroup>
            )}
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
        </label>

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
            onChange={onFormChange}
          />
          kg
        </label>

        <label>
          내 반려동물 소개:
          <input
            className="petData"
            name="petIntroduction"
            value={petData.petIntroduction}
            onChange={onFormChange}
          />
        </label>
      </form>
    </div>
    </LayoutUserExist>
  );
}

export default PetUpdate;
