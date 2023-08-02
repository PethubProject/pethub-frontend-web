import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BtnFloat from "../../components/Button/BtnFloat.js";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom.js";
import BoardHeader from "../../components/Header/HeaderBoard.js";
import defaultImg from "../../resources/image/userDefault.png";
import LayoutUserExist from "../../components/Layout/LayoutUserExist.js";
import useApiHooks from "../../api/BaseApi.js";
import ImgWrapper from "../../components/Wrapper/ImgWrapper.js";
import { isEmpty } from "../../components/Utils/Utils.js";
import "./PetInfo.css"

function PetList() {
  const nav = useNavigate();
  const { getApi } = useApiHooks();
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    getApi({ url: `/api/pet` }).then((resp) => {
      if (resp.status === 200) {
        console.log(resp.data.data);
        setPetList(resp.data.data);
      }
    });
  }, []);

  return (
    <LayoutUserExist>
      <div id="main">
        <BoardHeader title="펫 리스트" />
        <div id="petinfo-board" className="content flex-column">
          <div className="content scroll-hide board-list">
            <div className="list-col">
              {!isEmpty(petList) > 0 &&
                petList.map((p) => {
                  console.log(p);
                  return (
                    <div>
                      <div
                        key={p.petId}
                        className="petinfo-list-item"
                        onClick={() => {
                          nav(`/petinfo/detail?detailID=${p.petId}`);
                        }}
                      >
                        
                        <div
                          // style={{ marginTop: 10, marginBottom: 10 }}
                          className="petinfo-list-petImage"
                        >
                          <ImgWrapper
                            src={process.env.REACT_APP_API_URL + p.petImage}
                            alt={"내 펫 이미지"}
                            width="30px"
                            height="30px"
                            borderRadius="50%"
                            defaultImg={defaultImg}
                          />
                        </div>
                        {/*1. 펫 이름이 이미지 우측에 위치하도록 스타일링 */}
                        <div
                          className="petinfo-list-petName"
                        >
                          {p.petName}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <BtnFloat
            onClick={() => {
              nav("/petinfo/insert");
            }}
          />
        </div>
        <BottomTabNavigation />
      </div>
    </LayoutUserExist>
  );
}
export default PetList;
