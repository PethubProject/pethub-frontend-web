import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BtnFloat from "../../components/Button/BtnFloat.js";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom.js";
import BoardHeader from "../../components/Header/HeaderBoard.js";
import PetDummy from "../../dummy/PetDummy.js";
function PetInsert() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState("");
  const [disease, setDisease] = useState("");
  const nav = useNavigate();
  const [animalGroup, setAnimalGroup] = useState("");

  
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
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const uploadImage = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const imageUrl = reader.result;
        const imageName = generateImageName();

        localStorage.setItem(imageName, imageUrl);

        resolve(imageUrl);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(imageFile);
    });
  };

  const generateImageName = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = PetDummy.length + 1;
    const createdtime = new Date().toISOString();
    const newContent = {
      id,
      name,
      age,
      breed,
      weight,
      disease,
      createdtime,
    };
    PetDummy.push(newContent);
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      uploadImage(formData)
        .then((imageUrl) => {
          nav(`/petinfo/detail?detailID=${PetDummy.id}`);
        })
        .catch((error) => {
          console.error("이미지 업로드 실패", error);
        });
    } else {
      nav(`/petinfo/detail?detailID=${PetDummy.id}`);
    }
  };

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
        {image && (
          <img
            className="pet_select_image"
            src={URL.createObjectURL(image)}
            alt="반려동물 사진"
            style={{ maxWidth: "300px", marginTop: "10px" }}
          />
        )}
        
        <label>
          반려동물 이름:
          <input className="name" type="text" placeholder="이름" />
        </label>
        <label>
          반려동물 나이:
          <input
            className="age"
            type="number"
            min="0"
            placeholder="1살미만일 경우 0살"
          />
          살
        </label>

        <label>
          반려동물 종류:
          <select className="animal_group"
          onChange={(event) => setAnimalGroup(event.target.value)}>
            <option value="" selected disabled hidden>
              선택하시오
            </option>
            <option value="강아지">강아지</option>
            <option value="고양이">고양이</option>
          </select>
        </label>

        <label>
          반려동물 품종:
          <select>
            <option value="" selected disabled hidden>
              선택하시오
            </option>
            {animalGroup ==="강아지" &&(
              <optgroup label="소형견">
              {PetDummy.DogBreeds.small.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
              </optgroup>
            )}
            {animalGroup ==="강아지" &&(
              <optgroup label="중형견">
              {PetDummy.DogBreeds.small.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
              </optgroup>
            )}
            {animalGroup ==="강아지" &&(
              <optgroup label="대형견">
              {PetDummy.DogBreeds.small.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
              </optgroup>
            )}
            {animalGroup === "고양이" && (
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
          <input className="weight" type="number" min="0" placeholder="0.5kg" />
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
              nav(`/petinfo/`);
            }}
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
}

export default PetInsert;
