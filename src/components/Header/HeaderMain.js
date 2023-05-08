import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import logo from "../../resources/image/logo.png";
import { UserInit, UserState } from "../../state/User";
import BtnSignUp from "../Button/BtnSignUp";
import { postApi } from "../../api/BaseApi";
import { apiSignOut } from "../../api/SignApi";
export default function MainHeader() {
  const [user, setUserState] = useRecoilState(UserState);
  const navigate = useNavigate();
  const onSignInClick = useCallback(() => {
    navigate("/signin");
  }, []);
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
                  console.log(r);
                  if (r.ok) {
                    setUserState(UserInit);
                    navigate("/");
                  } else {
                    alert(r.msg);
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
