import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import useApiHooks from "../../api/BaseApi";
import logo from "../../resources/image/logo.png";
import { UserState } from "../../state/User";
import BtnSignUp from "../Button/BtnSignUp";
export default function MainHeader() {
  const user = useRecoilValue(UserState);
  const userReset = useResetRecoilState(UserState);
  const navigate = useNavigate();
  const onSignInClick = useCallback(() => {
    navigate("/signin");
  }, []);
  const { apiSignOut } = useApiHooks();
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
      <div>
        {user.nickName ? (
          <div className="span-v-bar">
            <span>{user.nickName}</span>
            <span></span>
            <span
              onClick={() => {
                apiSignOut().then((r) => {
                  if (r.ok) {
                    userReset();
                    navigate("/");
                  } else {
                  }
                });
              }}
            >
              로그아웃
            </span>
            <span></span>
            <FontAwesomeIcon icon={faBell} style={{ fontSize: "24px" }} />
          </div>
        ) : (
          <div className="span-v-bar">
            <span onClick={onSignInClick}>로그인</span>
            <span></span>
            <BtnSignUp />
          </div>
        )}
      </div>
    </header>
  );
}
