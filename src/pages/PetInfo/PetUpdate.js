import React, { useEffect, useState, useCallback, useRef } from "react";
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
  const MAX_LENGTH = 100;
  const onInputHandler = (e) => {
    if (e.target.value.length > MAX_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_LENGTH);
    }
  };

  // const textareaRef = useRef(null);
  // const [textareaHeight,setTextareaHeight] = useState("auto");

  // useEffect(()=> {
  //   if(textareaRef.current){
  //     textareaRef.current.style.height="auto";
  //     textareaRef.current.style.height=`${textareaRef.current.scrollHeight}px`;
  //   }
  // },[petData.petIntroduction]);

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
    //data:petData를 지운 상태에서 데이터를 입력하고 다시
    //data:petData를 복구 시킨뒤 업데이트 버튼을 누르면 업데이트가 됨..

    // function 함수(인자값!){}
    //  useCallback((상태값A)=>{},[상태값!!!!])

    putApi({ url: `/api/pet/${petData.petId}`, data: petData }).then((resp) => {
      console.log(resp);
      if (resp.status === 200) {
        navigate(`/petinfo/detail?detailID=${petData.petId}`, {
          replace: true,
        });
      }
    });
  }, [petData]);

  return (
    <LayoutUserExist>
      <div id="main">
        <BoardHeader
          title="내 반려동물 정보 수정 페이지"
          right={
            <div className="btn-wrapper">
              {/* <button className="btn">임시저장</button> */}
              <BtnUpdate
                onClick={() => {
                  if (
                    window.confirm(
                      petData.petName + "의 정보를 수정하시겠습니까?"
                    )
                  ) {
                    onUpdate();
                  } else {
                  }
                }}
              />
            </div>
          }
        />
        <div id="pet_update" className="petupdate-detail">
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

          <div className="insert_title">이름</div>
          <div>
            <input
              className="petData-input"
              type="text"
              placeholder="이름"
              name="petName"
              value={petData.petName}
              onChange={onFormChange}
            />
          </div>
          <div className="insert_title">나이</div>
          <div>
            <input
              className="petData-input"
              value={petData.petAge}
              name="petAge"
              type="number"
              min="0"
              placeholder="1살미만일 경우 0살"
              onChange={onFormChange}
            />
          </div>

          <div className="insert_title">성별</div>
          <div>
            <select
              className="petData-input"
              name="petGender"
              defaultChecked={petData.petGender}
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
          <div className="insert_title">품종</div>
          <div>
            <select
              className="petData-input"
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
          <div className="insert_title">무게</div>
          <div>
            <input
              className="petData-input"
              type="number"
              min="0"
              placeholder="0.5kg"
              name="petWeight"
              value={petData.petWeight}
              onChange={onFormChange}
            />
          </div>

          <div className="insert_title">소개</div>
          <div>
            <div className="textarea-counter">
              {petData.petIntroduction.length} / {MAX_LENGTH}자
            </div>
            <textarea
              type="text"
              placeholder="소개글을 작성하세요."
              maxLength={MAX_LENGTH}
              className="intro-area"
              name="petIntroduction"
              onInput={onInputHandler}
              value={petData.petIntroduction}
              onChange={onFormChange}
            />
          </div>
        </div>
      </div>
    </LayoutUserExist>
  );
}

export default PetUpdate;
