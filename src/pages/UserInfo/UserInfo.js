import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import useApiHooks from "../../api/BaseApi";
import BoardHeader from "../../components/Header/HeaderBoard";
import "../../components/List/list.css";
import ImgWrapper from "../../components/Wrapper/ImgWrapper";
import UserWrapper from "../../components/Wrapper/UserWrapper";
import { UserState } from "../../state/User";
import "./userInfo.css";
import ChangeUserNickName from "./ChangeUserNickName";
import defaultImg from "../../resources/image/userDefault.png";
import ChangeUserPassword from "./ChangeUserPassword";
import ChangeUserImage from "./ChangeUserImage";
import LayoutUserExist from "../../components/Layout/LayoutUserExist";

export default function UserInfo() {
  const user = useRecoilValue(UserState);

  return (
    <LayoutUserExist>
      <div id="main">
        <BoardHeader title={"내 정보"} />
        <div className="content flex-column">
          <div id="user-info">
            <div>
              <ImgWrapper src={process.env.REACT_APP_API_URL + "/" + user.userImage} alt={"유저이미지"} width="70px" height="70px" borderRadius="50%" defaultImg={defaultImg} />
              <div> {user.info.nickname}</div>
            </div>
            <ChangeUserNickName />
          </div>
          <div className="list-col">
            {/* <div className="list-item v-exp">사진 변경</div> */}
            <ChangeUserImage />
            <ChangeUserPassword />
            {/* <div className="list-item v-exp">비밀번호 변경</div> */}
          </div>
        </div>
      </div>
    </LayoutUserExist>
  );
}
