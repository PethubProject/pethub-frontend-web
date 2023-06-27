import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import useApiHooks from "../../api/BaseApi";
import BoardHeader from "../../components/Header/HeaderBoard";
import "../../components/List/list.css";
import { UserState } from "../../state/User";
import "./vetinfo.css";
import defaultImg from "../../resources/image/userDefault.png";
import LayoutVetExist from "../../components/Layout/LayoutVetExist";
import ImgWrapper from "../../components/Wrapper/ImgWrapper";
import ChangeUserImage from "../UserInfo/ChangeUserImage";
import ChangeUserPassword from "../UserInfo/ChangeUserPassword";
export default function VetInfo() {
  const [user, setUser] = useRecoilState(UserState);
  return (
    <LayoutVetExist>
      <div id="main">
        <BoardHeader title={"수의사 정보"} />
        <div className="content flex-column">
          <div id="user-info">
            <div>
              <ImgWrapper
                src={process.env.REACT_APP_API_URL + user.userImage}
                alt={"유저이미지"}
                width="70px"
                height="70px"
                borderRadius="50%"
                defaultImg={defaultImg}
              />
              <div> {user.name}</div>
            </div>
          </div>
          <div className="list-col">
            {/* <div className="list-item v-exp">사진 변경</div> */}
            <ChangeUserImage />
            <ChangeUserPassword />
            {/* <div className="list-item v-exp">비밀번호 변경</div> */}
          </div>
        </div>
      </div>
    </LayoutVetExist>
  );
}
