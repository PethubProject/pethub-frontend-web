import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faDog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { bottomModal } from "../../state/Modal";
import { User } from "../../state/User";
import SignIn from "../../pages/sign/SignIn";
import SignUp from "../../pages/sign/SignUp";
import BtnSignUp from "../button/BtnSignUp";

export default function MainHeader() {
  const user = useRecoilValue(User);
  const [bottomModalState, setBottomModalState] = useRecoilState(bottomModal);
  const onSignInClick = useCallback(() => {
    setBottomModalState({ show: true, title: "로그인", content: <SignIn /> });
  }, []);

  return (
    <header>
      <div>
        <FontAwesomeIcon icon={faDog} style={{ fontSize: "24px" }} />
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
