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
    image: null,
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
              {/* <button className="btn">임시저장</button> */}

              <BtnRegister onClick={onRegist} />
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
          <div>
            <label>반려동물 품종: </label>
            <select name="petBreed" onChange={handleBreedChange}>
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

export default PetInsert;
