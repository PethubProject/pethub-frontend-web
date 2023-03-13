import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function BtnSignUp() {
  const nav = useNavigate();
  const onSignUpClick = useCallback(() => {
    nav("/signup");
  }, []);

  return <span onClick={onSignUpClick}>회원가입</span>;
}
