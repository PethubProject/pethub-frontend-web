import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom.js";
import BoardHeader from "../../components/Header/HeaderBoard.js";
// import PetDummy from "../../dummy/PetDummy.js";
import useApiHooks from "../../api/BaseApi";
import LayoutUserExist from "../../components/Layout/LayoutUserExist.js";

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
        <div id="counsel_header">
          <BoardHeader title="내 반려동물 상세정보 페이지" />
        </div>
        <div id="counsel_content">
          <div className="box">
            {/* 추가수정 */}
            <div>펫 이름: {petContent.petName}</div>
            <div>펫 나이: {petContent.petAge}살</div>
            <div>펫 성별: {petContent.petGender}</div>
            <div>펫 품종: {petContent.petBreed}</div>
            <div>펫 체중: {petContent.petWeight}kg</div>
            <div>펫 소개: {petContent.petIntroduction}</div>
            {/* 2. 작성시간을 부여하기 */}
            {/* <div>작성일: {petContent.createdtime}</div> */}
            <div
              key={petContent.petId}
              className="update_btn"
              onClick={() => {
                nav(`/petinfo/update?detailID=${petContent.petId}`);
              }}
            >
              수정하기
            </div>
            {/* 3. 삭제버튼 이쁘게 만들기 */}
            <button
              className="btn_delete"
              onClick={() => {
                if (window.confirm(petContent.petName+"의 정보를 삭제하시겠습니까?")) {
                  onDel()
                } else {
                }
              }}
            >
              삭제
            </button>
          </div>
        </div>
        <BottomTabNavigation />
      </div>
    </LayoutUserExist>
  );
}

export default PetDetail;
