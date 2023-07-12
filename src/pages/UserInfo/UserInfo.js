import { useRecoilValue } from "recoil";
import BoardHeader from "../../components/Header/HeaderBoard";
import LayoutUserExist from "../../components/Layout/LayoutUserExist";
import "../../components/List/list.css";
import ImgWrapper from "../../components/Wrapper/ImgWrapper";
import defaultImg from "../../resources/image/userDefault.png";
import { UserState } from "../../state/User";
import ChangeUserImage from "./ChangeUserImage";
import ChangeUserNickName from "./ChangeUserNickName";
import ChangeUserPassword from "./ChangeUserPassword";
import "./userInfo.css";

export default function UserInfo() {
  const user = useRecoilValue(UserState);

  return (
    <LayoutUserExist>
      <div id="main">
        <BoardHeader title={"내 정보"} />
        <div className="content flex-column">
          <div id="user-info">
            <div>
              <ImgWrapper src={process.env.REACT_APP_API_URL  + user.userImage} alt={"유저이미지"} width="70px" height="70px" borderRadius="50%" defaultImg={defaultImg} />
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
    </LayoutUserExist>
  );
}
