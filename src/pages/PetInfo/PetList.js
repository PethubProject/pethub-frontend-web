import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import BtnFloat from "../../components/Button/BtnFloat.js";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom.js";
import BoardHeader from "../../components/Header/HeaderBoard.js";
import { UserState } from "../../state/User";
import defaultImg from "../../resources/image/userDefault.png";
import LayoutUserExist from "../../components/Layout/LayoutUserExist.js";
import useApiHooks from "../../api/BaseApi.js";
// import PetDummy from "../../dummy/PetDummy.js";
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
  const user = useRecoilValue(UserState);
  const ctime = new Date();
  const nav = useNavigate();
  const { getApi } = useApiHooks();
  // const [petList,setPetList] = useState({
  //   petId:"",
  //   petName:"",
  //   petImage:null,
  // });
  const [petList,setPetList] = useState([]);
  useEffect(() => {
    getApi({ url: "/api/pet"}).then(r=>{
        setPetList(r.data);
    });
  }, []);

  return (
    
      <div id="main">
        <BoardHeader title="펫 리스트" />
        <div id="counsel-board" className="content flex-column">
          <div className="content scroll-hide board-list">
            <div className="list-col">
              {petList.map((petList) => (
                <div
                  key={petList.petId}
                  className="list-item"
                  onClick={() => {
                    nav(`/petinfo/detail?detailID=${petList.petId}`);
                  }}
                >
                  <div className="list-title">
                    <ImgWrapper 
                    src={process.env.REACT_APP_API_URL  + user.userImage} 
                    alt={"내 펫 이미지"} width="30px" height="30px" borderRadius="50%" defaultImg={defaultImg} />
                  </div>
                  <div style={{ display: "flex", width: "100%" }}>
                    <div className="list-reg-user"></div>
                    <div className="list-reg-dt">
                      작성일: {ctime.toISOString()}
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
