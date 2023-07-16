import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom.js";
import BoardHeader from "../../components/Header/HeaderBoard.js";
// import PetDummy from "../../dummy/PetDummy.js";
import useApiHooks from "../../api/BaseApi";

/*
 // 펫 상세 조회
    @ValidToken
    @AuthCheck(role = AuthCheck.Role.OWNER)
    @GetMapping("/api/pet/{petId}")
    public ResponseEntity<Object> getPet(@PathVariable Long petId) {
        PetInfoResponseDto petInfoResponseDto = petService.findPetByPetId(petId);
        return ResponseEntity.ok().body(ResponseDto.of("펫 조회에 성공하였습니다", petInfoResponseDto));
    }

*/

function PetDetail() {
  const nav = useNavigate();
  const { getApi } = useApiHooks();
  const [petContent, setPetContent] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const petId = searchParams.get("detailID");
    getApi({ url: `/api/pet/${petId}` }).then((resp) => {
      console.log(resp);
      if (resp.data.data === null) {
        // nav(-1);
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
          <div>펫 종류: {petContent.animalGroup}</div>
          <div>펫 분류: {petContent.detialAnimalGroup}</div>
          <div>펫 품종: {petContent.breed}</div>
          <div>펫 체중: {petContent.weight}kg</div>
          <div>펫 질병: {petContent.disease}</div>
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
        </div>
      </div>
      <BottomTabNavigation />
    </div>
  );
}

export default PetDetail;
