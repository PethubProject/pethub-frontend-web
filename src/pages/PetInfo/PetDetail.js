import { useEffect, useState,useCallback } from "react";
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

  useEffect(() => {
    const petId = searchParams.get("detailID");
    getApi({ url: `/api/pet/${petId}` }).then((resp) => {
      console.log(resp);

      if (resp.data.data === null) {
        // alert("잘못된 접근입니다.")
        // nav(`/petinfo/`)
        return;
      }
      setPetContent(resp.data.data);
    });
  }, []);

  const onDel = useCallback(() => {
    const petId = searchParams.get("detailID");
    deleteApi({ url: `/api/pet/${petId}`}).then((resp) => {
      console.log(resp);
      if (resp.status === 200) {
        // nav(-1)-> 만약 이전에 다른 행위(작성, 등등)을 했을 경우 오류가 발생할 가능성이 있음. 
        //그렇다고 (nav`/petinfo' 를 하면 detail페이지는 문제 없으나, 리스트에 있는 삭제버튼을 누를 시 
        // 새로고침이 안되어 사용자가 새로고침을 누르지 않는 이상 계속 해당 게시물이 없어지지 않는 것 처럼 보임)
      }
    });
  }, []);

  // const PetDummys = PetDummy.PetDummy.find(
  //   (PetDummy) => PetDummy.id === parseInt(searchparams.get("detailID"))
  // );

  // if (!PetDummy) {
  //   return <h2>해당 펫 정보는 존재하지 않거나 삭제됐습니다.</h2>;
  // }

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
            수정하기
          </div>
          <button className="btn_delete" onClick={onDel}>
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
