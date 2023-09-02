import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import BtnFloat from "../../components/Button/BtnFloat.js";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom.js";
import BoardHeader from "../../components/Header/HeaderBoard.js";
import PetDummy from "../../dummy/PetDummy.js";
import { isEmpty } from "../../components/Utils/Utils";
import useApiHooks from "../../api/BaseApi";
import BtnRegister from "../../components/Button/BtnRegister";
import LayoutUserExist from "../../components/Layout/LayoutUserExist.js";

function PetInsert() {
  const nav = useNavigate();
  const { postApi, postApiWithFile } = useApiHooks();

  // 추가 수정부분
  const [petData, setPetData] = useState({
    petImage: "",
    petName: "",
    petAge: "",
    // 강아지 이외(ex) 고양이 등)을 추가하면 추가돼야하는 코드
    // animalGroup: "",
    petBreed: "",
    petGender: "",
    petWeight: "",
    petIntroduction: "",
  });

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

  // 1. 이미지 추가

  // const handleImageChange = (event) =>
  //   setPetData((prev) => ({
  //     ...prev,
  //     image: event.target.files[0],
  //   }));

  // const uploadImage = (imageFile) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       const imageUrl = reader.result;
  //       const imageName = generateImageName();

  //       localStorage.setItem(imageName, imageUrl);

  //       resolve(imageUrl);
  //     };

  //     reader.onerror = (error) => {
  //       reject(error);
  //     };

  //     reader.readAsDataURL(imageFile);
  //   });
  // };

  // const generateImageName = () => {
  //   const characters =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   let result = "";
  //   for (let i = 0; i < 10; i++) {
  //     result += characters.charAt(
  //       Math.floor(Math.random() * characters.length)
  //     );
  //   }
  //   return result;
  // };

  const onFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setPetData((preventData) => ({ ...preventData, [name]: value }));
  }, []);

  const onRegist = useCallback(() => {
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
    postApi({ url: "/api/pet", data: petData }).then((resp) => {
      console.log(resp);
      if (resp.status === 200) {
        nav(`/petinfo/detail?detailID=${resp.data.data.petId}`);
        // petData.petId(이걸로 하면 undefined(변수없음)이 뜸)가 아니라 resp.data.data.petId임

        // 추가 수정
        // if (petData.image !== null) {
        //   const formData = new FormData();
        //   formData.append("photo", petData.image);
        //   postApiWithFile({
        //     url: `/api/pet/${resp.data.petId}/image`,
        //     data: formData,
        //   });
        // }
      }
    });
  }, [petData]);

  //   if (image) {
  //     const formData = new FormData();
  //     formData.append("image", image);

  //     uploadImage(formData)
  //       .then((imageUrl) => {
  //         nav(`/petinfo/detail?detailID=${PetDummy.id}`);
  //       })
  //       .catch((error) => {
  //         console.error("이미지 업로드 실패", error);
  //       });
  //   } else {
  //     nav(`/petinfo/detail?detailID=${PetDummy.id}`);
  //   }
  // };

  return (
    <LayoutUserExist>
      <div id="main">
        <BoardHeader
          title="내 반려동물 정보 등록 페이지"
          right={
            <div className="btn-wrapper">
              <BtnRegister onClick={onRegist} />
            </div>
          }
        />
        <div id="pet_insert" className="petinsert-detail">

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
              onChange={handleGenderChange}
            >
              <option value="" selected disabled>
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
              onChange={handleBreedChange}
            >
              <option value="" selected hidden>
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

export default PetInsert;
