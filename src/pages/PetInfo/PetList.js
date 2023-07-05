import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BtnFloat from "../../components/Button/BtnFloat.js";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom.js";
import BoardHeader from "../../components/Header/HeaderBoard.js";

import LayoutUserExist from "../../components/Layout/LayoutUserExist.js";
import useApiHooks from "../../api/BaseApi.js";
import PetDummy from "../../dummy/PetDummy.js";

function PetList() {
  const nav = useNavigate();
  // const { getApi } = useApiHooks();
  // const [petList,setPetList] = useState([]);
  // useEffect(() => {
  //   getApi({ url: "/api/pet"}).then(r=>{
  //     if(Array.isArray(r.data)){
  //       setPetList(r.data);
  //     }
  //   });
  // }, []);

  //리스트에서 왼쪽에 반려동물 얼굴, 그리고 오른쪽에 이름 있으면 좋겠음.
  return (
    <LayoutUserExist>
      <div id="main">
        <BoardHeader title="펫 리스트" />
        <div id="counsel-board" className="content flex-column">
          <div className="content scroll-hide board-list">
            <div className="list-col">
              {PetDummy.PetDummy.map((petDummys) => (
                <div
                  key={petDummys.id}
                  className="list-item"
                  onClick={() => {
                    nav(`/petinfo/detail?detailID=${petDummys.id}`);
                  }}
                >
                  {/* 왜 alt 값이 읽히지 src 경로는 잘 한 것 같은데 잘 모르겠넹..*/}
                  <div className="list-title">
                    <img
                      src={`/dummy/image/${petDummys.image}`}
                      alt={petDummys.name + "의 사진"}
                      
                    ></img>
                  </div>
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
