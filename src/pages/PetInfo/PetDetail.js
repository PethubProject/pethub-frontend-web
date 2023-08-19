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

function PetDetail() {
  const nav = useNavigate();
  const { getApi } = useApiHooks();
  const { deleteApi } = useApiHooks();
  const [petContent, setPetContent] = useState({
    image: null,
    petName: "",
    petAge: "",
    // 강아지 이외(ex) 고양이 등)을 추가하면 추가돼야하는 코드
    // animalGroup: "",
    petBreed: "",
    petGender: "",
    petWeight: "",
    petIntroduction: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();

  //1. 해당 유저의 펫이 아니더라도 현재 링크로 접속하면 접속이 가능함. 해결해야함. 물론 리스트에는 안나옴.

  useEffect(() => {
    const petId = searchParams.get("detailID");
    getApi({ url: `/api/pet/${petId}` }).then((resp) => {
      if (resp.data.data === undefined) {
        alert("잘못된 접근입니다.");
        nav(`/petinfo/`);
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

  return (
    <LayoutUserExist>
      <div id="main">
        <BoardHeader title="내 반려동물 상세정보 페이지" />
        <div id="petinfo-detail" className="content flex-column">
          <div className="petinfo-detail-list-wrap">
            {/*  <div className="content scroll-hide board-list"> */}
            <div className="petinfo-detail-content">
              {/* 이미지 */}
              <div className="pet-item-image">
                {
                  <ImgWrapper
                    src={process.env.REACT_APP_API_URL + petContent.image}
                    alt={"내 펫 이미지"}
                    width="100px"
                    height="100px"
                    borderRadius="50%"
                    defaultImg={defaultImg}
                  />
                }
              </div>
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
    </LayoutUserExist>
  );
}

export default PetDetail;
