import React, { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useApiHooks from "../../api/BaseApi";
import { useEffect } from "react";
import defaultImg from "../../resources/image/userDefault.png";
import ImgWrapper from "../../components/Wrapper/ImgWrapper.js";

export default function TeleHealthDetail() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [vetContent, setVetContent] = useState({
    vetImage: null,
    name: "",
    introduction: "",
    address: "",
    openHour: "",
    closeHour: "",
    career: "",
  });

  const { getApi } = useApiHooks();
  //"api/vet/{vetId}"
  useEffect(() => {
    getApi({ url: `api/vet/${searchParams.get("userId")}` }).then((resp) => {
      setVetContent(resp.data.data);
      console.log(resp.data.data);
    });
  }, []);
  return (
    <div id="main">
      <div className="content">
        <ImgWrapper
          src={process.env.REACT_APP_API_URL + vetContent.vetImage}
          alt={"수의사 이미지"}
          width="100px"
          height="100px"
          borderRadius="50%"
          defaultImg={defaultImg}
        />

        <div>
          <label>수의사 이름: </label>
          {/*  */}
        </div>
        {/* 이름 받아오기, 추가로 자신의 프로필일 때 수정가능 하도록, css 변경 */}
        <div>
          <label>병원 이름: </label>
          {vetContent.name}
        </div>

        <div>
          <label>진료시간:</label>
          {vetContent.openHour}
          {vetContent.closeHour}
        </div>

        <div>
          <label>소개: </label>
          {vetContent.introduction}
        </div>

        <div>
          <label>경력: </label>
          {vetContent.career}
        </div>
      </div>
    </div>
  );
}
