import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BtnFloat from "../../components/Button/BtnFloat.js";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom.js";
import BoardHeader from "../../components/Header/HeaderBoard.js";
import PetDummy from "../../dummy/PetDummy.js";
import LayoutUserExist from "../../components/Layout/LayoutUserExist.js";
import useApiHooks from "../../api/BaseApi.js";

function PetList() {
  const nav = useNavigate();
  const { getApi } = useApiHooks();
  useEffect(() => {
    getApi({ url: "/api/pet" }).then((r) => console.log(r));
  }, []);
  //리스트에서 왼쪽에 반려동물 얼굴, 그리고 오른쪽에 이름 있으면 좋겠음.
  return (
    <LayoutUserExist>
      <div id="main">
        <BoardHeader title="펫 리스트" />
        <div id="counsel-board" className="content flex-column">
          <div className="content scroll-hide board-list">
            <div className="list-col">
              {PetDummy.map((petDummys) => (
                <div
                  key={petDummys.id}
                  className="list-item"
                  onClick={() => {
                    nav(`/petinfo/detail?detailID=${petDummys.id}`);
                  }}
                >
                  {/* dummy 데이터를 기반으로 반려동물 얼굴이 들어가도록*/}
                  <div className="list-title">{petDummys.name}</div>
                  <div style={{ display: "flex", width: "100%" }}>
                    <div className="list-reg-user"></div>
                    <div className="list-reg-dt">
                      작성일: {petDummys.createdtime}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <BottomTabNavigation />
        <BtnFloat
          onClick={() => {
            nav("/petinfo/insert");
          }}
        />
      </div>
    </LayoutUserExist>
  );
}

export default PetList;
