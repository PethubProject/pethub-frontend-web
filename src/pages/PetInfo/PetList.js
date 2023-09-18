import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BtnFloat from "../../components/Button/BtnFloat.js";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom.js";
import BoardHeader from "../../components/Header/HeaderBoard.js";
import defaultImg from "../../resources/image/userDefault.png";
import LayoutUserExist from "../../components/Layout/LayoutUserExist.js";
import useApiHooks from "../../api/BaseApi.js";
import ImgWrapper from "../../components/Wrapper/ImgWrapper.js";
import { isEmpty } from "../../components/Utils/Utils.js";
import "./PetInfo.css";
import { UserState } from "../../state/User";
import { useRecoilValue } from "recoil";

function PetList() {
  const nav = useNavigate();
  const user = useRecoilValue(UserState);
  console.log(user.role);
  const { getApi } = useApiHooks();
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    getApi({ url: `/api/pet` }).then((resp) => {
      if(user.role === "VET"){
        alert("수의사는 사용 불가능한 기능입니다. 관리자에게 문의하십시오");
        nav(`/`);
        return;
      }
      if (resp.status === 200) {
        console.log(resp.data.data);
        setPetList(resp.data.data);
      }
      if (resp.data.data === undefined) {
        alert("잘못된 접근입니다.");
        nav(`/`);
        return;
      }

    });
  }, []);

  return (
    <LayoutUserExist>
      {user.role === "OWNER" &&
      <div id="main">
        <BoardHeader title="펫 리스트" />
        <div id="petinfo-board" className="content">
          <div className="content flex-column">
            <div className="petinfo-list-wrap">
              {!isEmpty(petList) > 0 &&
                petList.map((p) => {
                  console.log(p);
                  return (
                    <div key={p.petId} className="petinfo-list-item">
                      <div
                        className="petinfo-list-toDetail"
                        onClick={() => {
                          nav(`/petinfo/detail?detailID=${p.petId}`);
                        }}
                      >
                        <div className="petinfo-list-petImage">
                          <ImgWrapper
                            src={process.env.REACT_APP_API_URL + p.petImage}
                            alt={"내 펫 이미지"}
                            width="50%"
                            height="50%"
                            borderRadius="50%"
                            defaultImg={defaultImg}
                          />
                        </div>
                        <div className="petinfo-list-petName">{p.petName}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          
          <BtnFloat
            onClick={() => {
              nav("/petinfo/insert");
            }}
          />
          </div>
        </div>
        <BottomTabNavigation />
      </div>
}
    </LayoutUserExist>
  );
}
export default PetList;
