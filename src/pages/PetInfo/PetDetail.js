import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom.js";
import BoardHeader from "../../components/Header/HeaderBoard.js";
// import PetDummy from "../../dummy/PetDummy.js";
import useApiHooks from "../../api/BaseApi";
import LayoutUserExist from "../../components/Layout/LayoutUserExist.js";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        alert("잘못된 접근입니다.")
        nav(`/petinfo/`)
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
        <div id="pet_header">
          <BoardHeader title="내 반려동물 상세정보 페이지" />
        </div>
        <div id="pet_content">
          <div className="pet-item">
            {/* 추가수정 */}
            <div className="pet-item-name">펫 이름: {petContent.petName}</div>
            <div className="pet-item-age">펫 나이: {petContent.petAge}살</div>
            <div className="pet-item-gender">펫 성별: {petContent.petGender}</div>
            <div className="pet-item-breed">펫 품종: {petContent.petBreed}</div>
            <div className="pet-item-weght">펫 체중: {petContent.petWeight}kg</div>
            <div className="pet-item-intro">펫 소개: {petContent.petIntroduction}</div>
            <div
              key={petContent.petId}
              className="btn_update"
              onClick={() => {
                nav(`/petinfo/update?detailID=${petContent.petId}`);
              }}
            >
              수정하기
            </div>
            <div
              className="btn_delete"
              onClick={() => {
                if (window.confirm(petContent.petName+"의 정보를 삭제하시겠습니까?")) {
                  onDel()
                } else {
                }
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        </div>
        <BottomTabNavigation />
      </div>
    </LayoutUserExist>
  );
}

export default PetDetail;
