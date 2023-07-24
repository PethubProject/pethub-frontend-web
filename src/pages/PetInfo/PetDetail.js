import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom.js";
import BoardHeader from "../../components/Header/HeaderBoard.js";
// import PetDummy from "../../dummy/PetDummy.js";
import useApiHooks from "../../api/BaseApi";


function PetDetail() {
  const nav = useNavigate();
  const { getApi } = useApiHooks();
  const [petContent, setPetContent] = useState({
    image: null,
    petName: "",
    petAge: "",
    // 강아지 이외(ex) 고양이 등)을 추가하면 추가돼야하는 코드
    // animalGroup: "",
    petBreed: "",
    petGender: "",
    petWeight: "",
    disease: "",
    petIntroduction: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const petId = searchParams.get("detailID");
    getApi({ url: `/api/pet/${petId}` }).then((resp) => {

      if (resp.data.data === null) {
        // alert("잘못된 접근입니다.")
        // nav(`/petinfo/`)
        return;
      }
      setPetContent(resp.data.data);
    });
  }, []);

  // const PetDummys = PetDummy.PetDummy.find(
  //   (PetDummy) => PetDummy.id === parseInt(searchparams.get("detailID"))
  // );

  // if (!PetDummy) {
  //   return <h2>해당 펫 정보는 존재하지 않거나 삭제됐습니다.</h2>;
  // }

  return (
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
          <div>펫 질병: {petContent.disease}</div>
          <div>펫 소개: {petContent.petIntroduction}</div>
          {/* <div>작성일: {petContent.createdtime}</div> */}
          <div
            key={petContent.petId}
            className="update_btn"
            onClick={() => {
              nav(`/petinfo/update?detailID=${petContent.petId}`);
              // if (petContent.petId) {
              // } else {
              //   alert("asdasda");
              // }
            }}
          >
            <span>펫 정보 수정하기</span>
          </div>
          <div>
            <span>삭제</span>
          </div>
        </div>
      </div>
      <BottomTabNavigation />
    </div>
  );
}

export default PetDetail;
