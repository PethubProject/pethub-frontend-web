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
import "./telehealth.css";
import { UserState } from "../../state/User";
import { useRecoilValue } from "recoil";
export default function TeleHealthInsert() {
  const nav = useNavigate();
  const { putApi, putApiWithFile } = useApiHooks();
  const { getApi } = useApiHooks();
  // 추가 수정부분
  const [vetData, setVetData] = useState({
    vetImage: null,
    name: "",
    hosName: "",
    introduction: "",
    address: "",
    openHour: "",
    closeHour: "",

    // openHour / closeHour
  });
  const user = useRecoilValue(UserState);

  const [careerInput, setCareerInput] = useState("");
  const [careers, setCareers] = useState([]);

  const [addressData, setAddressData] = useState({});
  const [name, setName] = useState("");

  const onFormChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setVetData((preventData) => ({ ...preventData, [name]: value }));
    },
    [careers, careerInput]
  );

  useEffect(() => {
    getApi({ url: `api/vet/${user.userId}` }).then((resp) => {
      if (resp.data.data) {
        setVetData((preventData) => ({
          ...preventData,
          ["vetImage"]: resp.data.data.vetImage,
          ["hosName"]: resp.data.data.hosName,
          ["introduction"]: resp.data.data.introduction,
          ["address"]: resp.data.data.address,
          ["openHour"]: resp.data.data.openHour,
          ["closeHour"]: resp.data.data.closeHour,
        }));
        const temp = resp.data.data.career.split("\n");
        temp.shift();
        setCareers(temp);
      }
    });
  }, []);
  //기존 정보 불러오기
  //현재 주소는 안불러와짐

  useEffect(() => {
    setVetData((preventData) => ({
      ...preventData,
      ["career"]: "\n" + careers.join("\n"),
    }));
  }, [careers]);

  useEffect(() => {
    setVetData((preventData) => ({
      ...preventData,
      ["address"]: addressData.roadAddress,
    }));
  }, [addressData]);

  useEffect(() => {
    console.log(name);
    setName(vetData.address);
    console.log(name);
  }, [name]);

  const onCareerChange = (e) => {
    setCareerInput(e.target.value);
  };

  const onCareerSubmit = (e) => {
    e.preventDefault();
    setCareers((preventData) => [...preventData, careerInput]);

    setCareerInput("");
  };

  const onDelete = (e, i) => {
    e.preventDefault();

    setCareers(careers.filter((item) => item !== i));
  };

  const onRegist = useCallback(() => {
    console.log(vetData);
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
    putApi({ url: "/api/vet", data: vetData }).then((resp) => {
      console.log(resp);
      if (resp.status === 200) {
      }
    });

    console.log(vetData);
  }, [vetData, careerInput, careers]);

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
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
              }}
            >
              <input
                className="vetData-input"
                type="text"
                placeholder="이름"
                name="hosName"
                value={vetData.hosName}
                onChange={onFormChange}
              />
            </div>
          </div>

          <div>
            <div className="insert-title">수의사 소개</div>
            <textarea
              className="intro-area"
              name="introduction"
              placeholder="수의사소개"
              type="text"
              value={vetData.introduction}
              onChange={onFormChange}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              gap: "32px",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "center", gap: "32px" }}
            >
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
            <div
              style={{ display: "flex", justifyContent: "center", gap: "32px" }}
            >
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

                // 엔터누르면 삭제되는 것은 포커싱 문제 같은데 추후 해결해보자.
              ))}
            </ul>
            <input
              className="career-area"
              type="text"
              placeholder="경력"
              name="career"
              value={careerInput}
              onChange={onCareerChange}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  onCareerSubmit(e);
                }
              }}
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
