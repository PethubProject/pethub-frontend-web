import React, { useCallback, useState } from "react";
import BoardHeader from "../../components/Header/HeaderBoard";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";
import { useNavigate } from "react-router-dom";
import useApiHooks from "../../api/BaseApi";
import BtnRegister from "../../components/Button/BtnRegister";
import { isEmpty } from "../../components/Utils/Utils";
import KakaoMapByAddress from "../../components/kakao/map/KakaoMapByAddress";
import InputAddress from "../../components/Input/InputAddress";
import InputText from "../../components/Input/InputText";
import "./telehealth.css";

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
  });

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
    setCareers((preventData) => [...preventData, career]);
  };

  const onDelete = (e, i) => {
    e.preventDefault();
    console.log(i);
    console.log(careers);
    setCareers(careers.filter((item) => item !== i));
  };

  const onRegist = useCallback(() => {
    setVetData((preventData) => ({ ...preventData, ["careers"]: careers }));

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
    postApi({ url: "/api/vet", data: vetData }).then((resp) => {
      console.log(resp);
      if (resp.status === 200) {
      }
    });

    console.log(vetData);
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
            <div className="insert-title">병원 이름</div>
            <input
              className="vetData-input"
              type="text"
              placeholder="이름"
              name="name"
              value={vetData.name}
              onChange={onFormChange}
            />
          </div>

          <div>
            <div className="insert-title">수의사 소개</div>
            <textarea
              className="intro-area"
              name="introduction"
              placeholder="수의사소개"
              type="text"
              onChange={onFormChange}
            />
          </div>

          <div>
            <div className="insert-title">여는 시간</div>
            <input
              className="vetData_openHour"
              type="time"
              placeholder="여는시간"
              name="openHour"
              value={vetData.openHour}
              onChange={onFormChange}
            />
          </div>
          <div>
            <div className="insert-title">닫는 시간</div>
            <input
              className="vetData_closeHour"
              type="time"
              placeholder="닫는시간"
              name="closeHour"
              value={vetData.closeHour}
              onChange={onFormChange}
            />
          </div>

          <div>
            <div className="insert-title">경력</div>
            {/* 경력은 다 묶어서 최종 등록 할 때 vet넣어주자 */}
            <ul style={{ maxHeight: "200px", overflowY: "auto" }}>
              {careers.map((item, idx) => (
                <>
                  <input
                    className="career-area"
                    key={idx}
                    value={item}
                    type="text"
                    placeholder="경력"
                  />
                  <button
                    onClick={(e) => {
                      onDelete(e, item);
                    }}
                  >
                    X
                  </button>
                </>
              ))}
            </ul>
            <input
              className="career-area"
              type="text"
              placeholder="경력"
              name="career"
              value={career}
              onChange={onCareerChange}
            />
            <button onClick={onCareerSubmit}>경력추가하기</button>
          </div>

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
