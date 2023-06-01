import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom.js";
import BoardHeader from "../../components/Header/HeaderBoard.js";
import PetDummy from "../../dummy/PetDummy.js";

function PetDetail() {
  const nav = useNavigate();
  const [searchparams, setsearchparams] = useSearchParams();
  const PetDummys = PetDummy.PetDummy.find(
    (PetDummy) => PetDummy.id === parseInt(searchparams.get("detailID"))
  );

  if (!PetDummy) {
    return <h2>해당 펫 정보는 존재하지 않거나 삭제됐습니다.</h2>;
  }

  return (
    <div id="main">
      <div id="counsel_header">
        <BoardHeader title="내 반려동물 상세정보 페이지" />
      </div>
      <div id="counsel_content">
        <div className="box">
          <div>펫 이름: {PetDummys.name}</div>
          <div>펫 나이: {PetDummys.age}살</div>
          <div>펫 종류: {PetDummys.dorc}</div>
          <div>펫 품종: {PetDummys.breed}</div>
          <div>펫 체중: {PetDummys.weight}kg</div>
          <div>펫 질병: {PetDummys.disease}</div>
          <div>작성일: {PetDummys.createdtime}</div>
          <div
            key={PetDummys.id}
            className="update_btn"
            onClick={() => nav(`/petinfo/update?detailID=${PetDummys.id}`)}
          >
            <span>펫 정보 수정하기</span>
          </div>
        </div>
      </div>
      <BottomTabNavigation />
    </div>
  );
}

export default PetDetail;
