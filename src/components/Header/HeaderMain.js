import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import logo from "../../resources/image/logo.png";
import { UserState } from "../../state/User";
import BtnSignUp from "../Button/BtnSignUp";
import ImgWrapper from "../Wrapper/ImgWrapper";
import useApiHooks from "../../api/BaseApi";
import UserWrapper from "../Wrapper/UserWrapper";
import defaultImg from "../../resources/image/userDefault.png";
export default function MainHeader() {
  const user = useRecoilValue(UserState);
  const navigate = useNavigate();
  const onSignInClick = useCallback(() => {
    navigate("/signin");
  }, [navigate]);
  const { getApi } = useApiHooks();

  return (
    <header>
      <div
        className="img-wrap"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={logo} alt="logo" />
      </div>

      <div id="header-user-info">
        <UserWrapper
          isUser={
            <div className="span-v-bar">
              <ImgWrapper
                src={process.env.REACT_APP_API_URL + user.userImage}
                alt={"유저이미지"}
                width="36px"
                height="36px"
                borderRadius="18px"
                defaultImg={defaultImg}
              />
              <span></span>
              <span>{user.nickname}</span>
              <span></span>
              <FontAwesomeIcon icon={faBell} style={{ fontSize: "20px" }} />
            </div>
          }
          noUser={
            <div className="span-v-bar">
              <span onClick={onSignInClick}>로그인</span>
              <span></span>
              <BtnSignUp />
            </div>
          }
        />
      </div>
    </header>
  );
}
