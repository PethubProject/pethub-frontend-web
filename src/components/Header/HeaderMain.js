import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import logo from "../../resources/image/logo.png";
import { UserState } from "../../state/User";
import BtnSignUp from "../Button/BtnSignUp";
export default function MainHeader() {
  const user = useRecoilValue(UserState);
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
        {user.memberId ? (
          <FontAwesomeIcon icon={faBell} style={{ fontSize: "24px" }} />
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
