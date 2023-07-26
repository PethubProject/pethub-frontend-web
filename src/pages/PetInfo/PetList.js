import React, { useEffect, useState, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate, useSearchParams } from "react-router-dom";
import BtnFloat from "../../components/Button/BtnFloat.js";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom.js";
import BoardHeader from "../../components/Header/HeaderBoard.js";
import { UserState } from "../../state/User";
import defaultImg from "../../resources/image/userDefault.png";
import LayoutUserExist from "../../components/Layout/LayoutUserExist.js";
import useApiHooks from "../../api/BaseApi.js";
import ImgWrapper from "../../components/Wrapper/ImgWrapper.js";
import { isEmpty } from "../../components/Utils/Utils.js";
import { Chat } from "../../state/Chatting.js";

function PetList() {
  // const [chat,setChat] = useRecoilState(CC.Chat);
  // const chat = useRecoilValue(CC.Chat)
  // const setChat = useSetRecoilState(CC.Chat);
  // const resetChat = useResetRecoilState(CC.Chat)
  const user = useRecoilValue(UserState);
  const ctime = new Date();
  const nav = useNavigate();
  // 구조분해
  /**
   *  const a = {
   *  name:"",
   *  age:12.
   * }
   *
   * const c = a.age;
   * const {age} = a/
   */
  const { getApi } = useApiHooks();
  const { deleteApi } = useApiHooks();
  const [petList, setPetList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getApi({ url: `/api/pet` }).then((resp) => {
      if (resp.status === 200) {
        console.log(resp.data.data);
        setPetList(resp.data.data);
      }
    });
  }, []);

  // const onDel = useCallback(() => {
  //   deleteApi({ url: `/api/pet/${petId}` }).then((resp) => {
  //     console.log(resp);
  //     if (resp.status === 200) {
  //       nav(-1);
  //     }
  //   });
  // }, []);

  return (
    // 삭제 버튼도 추가하여 리스트창에서도 삭제 가능하도록 구현해보기.
    <LayoutUserExist>
      <div id="main">
        <BoardHeader title="펫 리스트" />
        <div id="counsel-board" className="content flex-column">
          <div className="content scroll-hide board-list">
            <div className="list-col">
              {!isEmpty(petList) > 0 &&
                petList.map((p) => {
                  console.log(p);
                  return (
                    <div>
                      <div key={p.petId} className="list-item">
                        <div
                          className="list-title"
                          onClick={() => {
                            nav(`/petinfo/detail?detailID=${p.petId}`);
                          }}
                        >
                          <ImgWrapper
                            src={process.env.REACT_APP_API_URL + p.petImage}
                            alt={"내 펫 이미지"}
                            width="30px"
                            height="30px"
                            borderRadius="50%"
                            defaultImg={defaultImg}
                          />
                        </div>
                        {/* 펫 이름이 이미지 우측에 위치하도록 스타일링 */}
                        <div>{p.petName}</div>
                        <div style={{ display: "flex", width: "100%" }}>
                          <div className="list-reg-user"></div>
                          <div className="list-reg-dt">
                            등록일: {ctime.toISOString()}
                          </div>
                          <div>
                            <button
                              className="btn_delete"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    p.petName +" 의 정보를 삭제하시겠습니까?"
                                  )
                                ) {
                                  deleteApi({
                                    url: `/api/pet/${p.petId}`,
                                  }).then((resp) => {
                                    console.log(resp);
                                    if (resp.status === 200) {
                                      // 삭제 -> 목록에서 삭제된 아이템을 빼준다.
                                      // petList = list => element 1개 제거를 한다.
                                      //목록을 표시하는 페이지에서 아이템을 삭제시킬때 쓰이는 로직
                                      setPetList((pets) =>
                                        pets.filter(
                                          (pet) => pet.petId !== p.petId
                                        )
                                      );
                                    }
                                  });
                                } else {
                                }
                              }}
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <BtnFloat
            onClick={() => {
              nav("/petinfo/insert");
            }}
          />
        </div>
        <BottomTabNavigation />
      </div>
    </LayoutUserExist>
  );
}
export default PetList;
