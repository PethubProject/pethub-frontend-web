import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import BtnFloat from "../../components/Button/BtnFloat.js";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom.js";
import BoardHeader from "../../components/Header/HeaderBoard.js";
import PetDummy from "../../dummy/PetDummy.js";
import { isEmpty } from "../../components/Utils/Utils";
import useApiHooks from "../../api/BaseApi";
import LayoutUserExist from "../../components/Layout/LayoutUserExist.js";

/*
// 펫 등록
    @ValidToken
    @AuthCheck(role = AuthCheck.Role.OWNER)
    @PostMapping("/api/pet")
    public ResponseEntity<Object> registerPet(@RequestBody PetRequestDto petRequestDto) {
        long petId = petService.registerPet(UserContext.userData.get().getUserId(), petRequestDto);
        return ResponseEntity.ok().body(ResponseDto.of("펫 등록에 성공하였습니다", Map.of("petId", petId)));
    }
*/

function PetInsert() {
  // const [image, setImage] = useState("");
  // const [name, setName] = useState("");
  // const [age, setAge] = useState("");
  // const [breed, setBreed] = useState("");
  // const [weight, setWeight] = useState("");
  // const [disease, setDisease] = useState("");

  // const [animalGroup, setAnimalGroup] = useState("");
  const nav = useNavigate();
  const { postApi, postApiWithFile } = useApiHooks();

  // 추가 수정부분
  const [petData, setPetData] = useState({
    image: null,
    petName: "",
    petAge: "",
    petGender: "",
    petWeight: "",
    petBreed: "",
    petIntroduction: "",
    disease: "",
    animalGroup: "",
  });

  const handleSubmit = null;

  const handleBreedChange = (event) =>
    setPetData((prev) => ({
      ...prev,
      breed: event.target.value,
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

  const handleImageChange = (event) =>
    setPetData((prev) => ({
      ...prev,
      image: event.target.files[0],
    }));

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

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const id = PetDummy.length + 1;
  //   const createdtime = new Date().toISOString();
  //   const newContent = {
  //     id,
  //     name,
  //     age,
  //     breed,
  //     weight,
  //     disease,
  //     createdtime,
  //   };
  //   PetDummy.push(newContent);

  //속성 값
  const onFormChagne = useCallback((e) => {
    const { name, value } = e.target;
    setPetData((preventData) => ({ ...preventData, [name]: value }));
  }, []);

  const onRegist = useCallback(
    (e) => {
      var ok = true;
      Object.keys(petData).map((k) => {
        const v = petData[k];
        if (isEmpty(v)) {
          const target = document.querySelector(`[name="${k}"]`);
          if (!isEmpty(target)) {
            target.focus();
          }
          ok = false;
          return false;
        }
      });
      if (!ok) {
        return false;
      }
      postApi({ url: "/api/pet", data: petData }).then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          // 추가 수정
          if (petData.image !== null) {
            const formData = new FormData();
            formData.append("photo", petData.image);
            postApiWithFile({
              url: `/api/pet/${resp.data.petId}/image`,
              data: formData,
            });
          }
        }
      });
    },
    [petData]
  );

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
    <div id="main">
      <div>
        <BoardHeader title="내 반려동물 정보 등록 페이지" />
      </div>
      <div id="insert_title">
        <h2>반려동물 정보 등록</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          반려동물 사진:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        {/* 추후 수정 */}
        {/* {petData.image && (
          <img
            className="pet_select_image"
            src={URL.createObjectURL(petData.image)}
            alt="반려동물 사진"
            style={{ maxWidth: "300px", marginTop: "10px" }}
          />
        )} */}

        <label>
          반려동물 이름:
          <input
            className="petData-select"
            type="text"
            placeholder="이름"
            name="name"
            value={petData.name}
            onChange={onFormChagne}
          />
        </label>
        <label>
          반려동물 나이:
          <input
            className="petData-select"
            value={petData.age}
            name="age"
            type="number"
            min="0"
            placeholder="1살미만일 경우 0살"
            onChange={onFormChagne}
          />
          살
        </label>

        <label>
          반려동물 종류:
          <select className="animal_group" onChange={handleAnimalGroupChange}>
            <option value="" selected disabled>
              선택하시오
            </option>
            <option value="강아지">강아지</option>
            <option value="고양이">고양이</option>
          </select>
        </label>

        <label>
          반려동물 품종:
          <select onChange={handleBreedChange}>
            <option value="" selected hidden>
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
            {petData.animalGroup === "고양이" && (
              <optgroup label="고양이 종">
                {PetDummy.CatBreeds.고양이.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </optgroup>
            )}
          </select>
        </label>

        <label>
          반려동물 무게:
          <input
            className="petData.weight"
            type="number"
            min="0"
            placeholder="0.5kg"
            name="weight"
            value={petData.weight}
            onChange={onFormChagne}
          />
          kg
        </label>
        <label>
          반려동물 질병:
          <select className="petData-select" onChange={handleDiseaseChange}>
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
      </form>
      <div className="board_update_btn">
        <button className="insert_btn" onClick={onRegist}>
          등록
        </button>
      </div>
    </div>
  );
}

export default PetInsert;
