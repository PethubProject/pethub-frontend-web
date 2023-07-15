import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BtnFloat from "../../components/Button/BtnFloat.js";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom.js";
import BoardHeader from "../../components/Header/HeaderBoard.js";

import LayoutUserExist from "../../components/Layout/LayoutUserExist.js";
import useApiHooks from "../../api/BaseApi.js";
import PetDummy from "../../dummy/PetDummy.js";
import ImgWrapper from "../../components/Wrapper/ImgWrapper.js";

/*
// backend code 
// 펫 리스트 조회
    // userId
    @ValidToken
    @AuthCheck(role = AuthCheck.Role.OWNER)
    @GetMapping("/api/pet")
    public ResponseEntity<Object> getPetList() {
        List<PetListResponseDto> responseDto = petService.findPetListByUserId(UserContext.userData.get().getUserId());
        return ResponseEntity.ok().body(ResponseDto.of("펫 리스트 조회에 성공하였습니다", responseDto));
    }
*/



function PetList() {
  const nav = useNavigate();
  const { getApi } = useApiHooks();
  const [petList,setPetList] = useState([]);
  useEffect(() => {
    getApi({ url: "/api/pet"}).then(r=>{
      if(Array.isArray(r.data)){
        setPetList(r.data);
      }
    });
  }, []);

  //리스트에서 왼쪽에 반려동물 얼굴, 그리고 오른쪽에 이름 있으면 좋겠음.
  return (
    
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
                  <div className="list-title">
                    <ImgWrapper
                    src={petDummys.image}
                    alt={petDummys.name + "의 사진"}
                    width="30px"
                    height="30px"
                    borderRadius="15px"
                    ></ImgWrapper>
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
        
        <BtnFloat
          onClick={() => {
            nav("/petinfo/insert");
          }}
        />
        <BottomTabNavigation />
      </div>
    
  );
}

export default PetList;
