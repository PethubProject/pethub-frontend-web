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
export default function UserInfo() {
  return (
    <UserWrapper
      isUser={<UserInfoContent />}
      noUser={<Navigate to="/signin" />}
    />
  );
}

function UserInfoContent() {
  const { getApi } = useApiHooks();
  const user = useRecoilValue(UserState);
  useEffect(() => {
    getApi({ url: `/api/user/nickname?nickname=${user.nickname}` }).then((r) =>
      console.log(r)
    );
  }, []);

  return (
    <div id="main">
      <BoardHeader />
      <div className="content flex-column">
        <div id="user-info">
          <div>
            <ImgWrapper
              src={process.env.REACT_APP_API_URL + user.userImage}
              alt={"유저이미지"}
              width="100px"
              height="100px"
              borderRadius="50px"
              defaultImg={defaultImg}
            />
            <div> {user.nickname}</div>
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
  );
}
