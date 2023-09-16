import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom.js";
import BoardHeader from "../../components/Header/HeaderBoard.js";
// import PetDummy from "../../dummy/PetDummy.js";
import useApiHooks from "../../api/BaseApi";
import LayoutUserExist from "../../components/Layout/LayoutUserExist.js";
import {
  faGenderless,
  faMars,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImgWrapper from "../../components/Wrapper/ImgWrapper.js";
import defaultImg from "../../resources/image/userDefault.png";
import "./PetInfo.css";
import { UserState } from "../../state/User";
import { useRecoilValue } from "recoil";
import UserWrapper from "../../components/Wrapper/UserWrapper.js";


function PetDetail() {
  const nav = useNavigate();
  const user = useRecoilValue(UserState);
  console.log(user.role);
  const { fileUpload,getApi,deleteApi } = useApiHooks();
  const [petContent, setPetContent] = useState({
    petId:"",
    petImage: "",
    petName: "",
    petAge: "",
    petBreed: "",
    petGender: "",
    petWeight: "",
    petIntroduction: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [isHovered, setIsHovered] = useState(false);

  //1. 해당 유저의 펫이 아니더라도 현재 링크로 접속하면 접속이 가능함. 해결해야함. 물론 리스트에는 안나옴.

  useEffect(() => {
    const petId = searchParams.get("detailID");
    getApi({ url: `/api/pet/${petId}` }).then((resp) => {
      console.log(resp)
      if(user.role === "VET"){
        alert("수의사는 사용 불가능한 기능입니다. 관리자에게 문의하십시오");
        nav(`/`);
        return;
      }
      if (resp.data.data === undefined) {
        alert("잘못된 접근입니다.");
        nav(`/`);
        return;
      }
      setPetContent(resp.data.data);
    });
  }, []);

  const onDel = useCallback(() => {
    const petId = searchParams.get("detailID");
    deleteApi({ url: `/api/pet/${petId}` }).then((resp) => {
      console.log(resp);
      if (resp.status === 200) {
        nav(`/petinfo`);
      }
    });
  }, []);

  const handleHoverClick= ()=>{
    const input = document.getElementById("petUpdate-img")
    if(input){
      input.click();
    }
}
  const handleImageChange = useCallback((e)=>{

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("photo", file);
    fileUpload({ url: `/api/pet/${petContent.petId}/image`, data: formData }).then(
      (r) => {
        console.log(r)
        setPetContent((p) => ({ ...p, petImage: r.data.img }));
      });
  },[petContent])

  return (
    <UserWrapper>
      <div id="main">
        <BoardHeader title="내 반려동물 상세정보 페이지" />
        <div id="petinfo-detail" className="content flex-column">
          <div className="petinfo-detail-list-wrap">
            {/*  <div className="content scroll-hide board-list"> */}
            <div className="petinfo-detail-content">
              {/* 이미지 */}
              <div className="pet-item-image">
                <div
                className="petInfoImg-container"
                onMouseEnter={()=>setIsHovered(true)}
                onMouseLeave={()=>setIsHovered(false)}
                onClick={handleHoverClick}>
                {
                  <ImgWrapper
                  className="petdetail-img"
                  src={process.env.REACT_APP_API_URL + petContent.petImage}
                    alt={"내 펫 이미지"}
                    width="100px"
                    height="100px"
                    borderRadius="50%"
                    defaultImg={defaultImg}
                  />
                  
                }
                {isHovered && (
                  <div className="petInfoImg-hover-text">사진변경</div>
                )}
              </div>
            </div>

            <input
              type="file"
              id="petUpdate-img"
              accept="image/*"
              capture={"user"}
              onChange={handleImageChange}/>


              {/* 이름 */}
              <div className="pet-item-name">{petContent.petName}</div>
              <div className="pet-detail-wrap">
                {/* 나이 */}
                <div className="pet-item-age">{petContent.petAge}살</div>
                {/* 성별 */}
                <div className="pet-item-gender">
                  {petContent.petGender === "수컷" ? (
                    <FontAwesomeIcon icon={faMars} />
                  ) : petContent.petGender === "암컷" ? (
                    <FontAwesomeIcon icon={faVenus} />
                  ) : (
                    <FontAwesomeIcon icon={faGenderless} />
                  )}
                </div>
                {/* 품종 */}
                <div className="pet-item-breed">{petContent.petBreed}</div>
                {/* 체중 */}
                <div className="pet-item-weight">{petContent.petWeight}kg</div>
              </div>
              <div className="pet-intro">소개</div>
              <div className="pet-item-intro">{petContent.petIntroduction}</div>
            </div>

            <div className="petinfo-btn-wrap">
              <div
                key={petContent.petId}
                className="petinfo-btn-update"
                onClick={() => {
                  nav(`/petinfo/update?detailID=${petContent.petId}`);
                }}
              >
                수정
              </div>
              <div
                className="petinfo-btn-delete"
                onClick={() => {
                  if (
                    window.confirm(
                      petContent.petName + "의 정보를 삭제하시겠습니까?"
                    )
                  ) {
                    onDel();
                  } else {
                  }
                }}
              >
                삭제
              </div>
            </div>
          </div>
        </div>
        <BottomTabNavigation />
      </div>
    </UserWrapper>
    
  );
}

export default PetDetail;
