import { useNavigate } from "react-router-dom";
import BoardHeader from "../../components/Header/HeaderBoard";
import ImgWrapper from "../../components/Wrapper/ImgWrapper";

// css
import { useEffect, useState } from "react";
import useApiHooks from "../../api/BaseApi";
import "./telehealth.css";

import BottomTabNavigation from "../../components/Navigation/NavigationBottom";
import BtnFloat from "../../components/Button/BtnFloat";

export default function TeleHealth() {
  const nav = useNavigate();
  const { getApi } = useApiHooks();

  const [vets, setVets] = useState([]);

  // const [상태값 변수명, 상태값 변경 함수명] = useState(초기값);

  useEffect(() => {
    const data_load = async () => {
      var resp = await getApi({ url: "/api/vet/vets/0" });
      if (resp.data.content.length > 0) {
        setVets(resp.data.content);
      }
    };
    data_load();
  }, []);
  // useEffect(함수,배열);
  // React -> 대부분 비동기로데이터를 불러온다
  // 비동기의 상태는 -> Promise
  // 2가지
  // 1. 함수.then().then()->>>>>>>>>>>
  // getApi({url:"~~",data:{~~~}}).then((resp)=>{~~~~~~~}).catch((error)=>{}).finally(()=>{});
  // async await ;

  //
  // const DataList = () => {
  //   return data.map((d) => {
  //     return <div key={Math.random()}></div>;
  //   });
  // };
  /**
   *
   * 파이썬 -> 리스트,딕션너리,튜플 -> 모두가 class
   *
   * 자바스크립트에서는 -> 배열, {}:오브젝트
   *
   * 배열 -> map((요소,인덱스)=>{
   *  요소~~
   *  인덱스!!!
   * });
   *
   * 오브젝트-> object[키]=밸류
   *
   *
   *
   */

  return (
    <div id="main">
      <BoardHeader title={"비대면 진료"} />
      <div className="content">
        {console.log(vets)}

        <div className="list-col">
          {vets.length > 0
            ? vets.map((v) => {
                return (
                  <div
                    className="list-item v-exp"
                    key={Math.random()}
                    onClick={() => {
                      nav(`/telehealth/content?userId=${v.userId}`);
                    }}
                  >
                    <div className="p0">
                      <ImgWrapper
                        src={process.env.REACT_APP_API_URL + v.vetImage}
                        width={"100px"}
                        height={"100px"}
                      />
                    </div>

                    <div className="chat-content">
                      <div>{v.name + " 의사"}</div>
                      <div>{"병원이름 " + v.hosName}</div>
                      <div>{"오픈시간 " + v.openHour3}</div>
                      <div>{"리뷰점수 " + "5"}</div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
        <BtnFloat
          onClick={() => {
            nav("/telehealth/insert");
          }}
        />
      </div>
      <BottomTabNavigation />
    </div>
  );
}

/**
 *
 *   CRUD
 *   목록조회
 *   상세보기
 *   등록
 *   수정
 *   삭제
 *
 *
 *
 *   목록 조회
 *   상세보기
 *   수정
 *   삭제
 *
 *   ~~~~ 등록
 *
 *  태그를 그리는 것보다.
 *  useEffect(()=>{
 *  getApi(~~~).then(!!!!!!!)
 * },[])
 *
 *  상세보기
 *  데이터를 가져온다 -> 그린다.
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
