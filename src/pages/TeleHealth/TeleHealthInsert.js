import React, { useCallback, useEffect, useState } from "react";
import BoardHeader from "../../components/Header/HeaderBoard";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";
import { useNavigate } from "react-router-dom";
import useApiHooks from "../../api/BaseApi";
import BtnRegister from "../../components/Button/BtnRegister";
import { isEmpty } from "../../components/Utils/Utils";
import KakaoMapByAddress from "../../components/kakao/map/KakaoMapByAddress";
import InputAddress from "../../components/Input/InputAddress";
import InputText from "../../components/Input/InputText";

export default function TeleHealthInsert() {
  const nav = useNavigate();
  const { postApi, postApiWithFile } = useApiHooks();

  // 추가 수정부분
  const [vetData, setVetData] = useState({
    vetImage: null,
    name: "",
    introduction: "",
    address: "",
    openHour: "",
    closeHour: "",
    // openHour / closeHour 
  });

  useEffect(()=>{
    //  수의사 정보 받아오기
    /**
     * vetId or userId
     * getApi  받아와서 setVetData(상태)
     * 
     */
  },[])

  const [career, setCareer] = useState("");
  const [careers, setCareers] = useState([]);

  const [addressData, setAddressData] = useState({});
  const [name, setName] = useState("");

  const onFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setVetData((preventData) => ({ ...preventData, [name]: value }));
  }, []);

  const onCareerChange = (e) => {
    setCareer(e.target.value);
  };
  const onCareerSubmit = (e) => {
    e.preventDefault();
    setCareer("");
    setCareers((preventData) => [career, ...preventData]);
  };
  const onRegist = useCallback(() => {
    var ok = true;
    Object.keys(vetData).map((k) => {
      const v = vetData[k];
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
    // const vetData.clinicHour = vetData.openHour + vetData.closeHour
    postApi({ url: "/api/vet", data: vetData }).then((resp) => {
      console.log(resp);
      if (resp.status === 200) {
      }
    });
  }, [vetData]);

  return (
    <div id="main">
      <BoardHeader
        title="수의사 정보 등록"
        right={
          <div className="btn-wrapper">
            {/* <button className="btn">임시저장</button> */}

            <BtnRegister onClick={onRegist} />
          </div>
        }
      />

      <div className="content">
        <form id="vet_insert" className="vet_detail">
          <div>
            <div>병원 이름: </div>
            <input
              className="vetData_name"
              type="text"
              placeholder="이름"
              name="name"
              value={vetData.name}
              onChange={onFormChange}
            />
          </div>

          <div>
            <div>수의사 소개:</div>
            <textarea
              className="vetData_introduction"
              name="introduction"
              placeholder="수의사소개"
              type="text"
              onChange={onFormChange}
            />
          </div>

          <div>
            <div>여는 시간: </div>
            <input
              className="vetData_openHour"
              type="text"
              placeholder="여는시간"
              name="openHour"
              value={vetData.openHour}
              onChange={onFormChange}
            />
          </div>
          <div>
            <div>닫는 시간: </div>
            <input
              className="vetData_closeHour"
              type="text"
              placeholder="닫는시간"
              name="closeHour"
              value={vetData.closeHour}
              onChange={onFormChange}
            />
          </div>
          <div>
            <div>경력: </div>
            <input
              className="vetData_career"
              type="text"
              placeholder="경력"
              name="career"
              value={career}
              onChange={onCareerChange}
            />
            <button onClick={onCareerSubmit}>등록하기</button>
          </div>

          {/* 경력은 다 묶어서 최종 등록 할 때 vetData에넣어주자 */}
          <ul>
            {careers.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <div style={{ width: "100%" }}>
            <InputText state={setName} label={"병원주소"} />
            <InputAddress Address setData={setAddressData} />
          </div>

          <div style={{ width: "100%", height: "50%" }}>
            <KakaoMapByAddress
              style={{ width: "100%", height: "100%" }}
              address={addressData.roadAddress}
              name={name}
            />
          </div>
          {/* <AlertModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} /> */}
        </form>
      </div>
      <BottomTabNavigation />
    </div>
  );
}
