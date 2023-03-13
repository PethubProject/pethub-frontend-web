import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import BtnRequest from "../../components/Button/BtnRequest";
import InputId from "../../components/Input/InputId";
import InputPassword from "../../components/Input/InputPassword";
import LayoutCloseForm from "../../components/Layout/LayoutCloseForm";
import { modalState } from "../../components/Modal/Modal";
import "./sign.css";
import { apiSignIn } from "../../api/SignApi";
import { UserInit, UserState } from "../../state/User";

export default function SignIn() {
  const [id, setId] = useState({});
  const [pw, setPw] = useState({});
  const navigate = useNavigate();
  const setModal = useSetRecoilState(modalState);
  const setUserState = useSetRecoilState(UserState);
  // const [userToken, setUserToken] = useRecoilState(UserTokenState);
  const onSubmitHandler = useCallback(() => {
    apiSignIn({ memberId: id.value, memberPw: pw.value }).then((r) => {
      if (r.status === "success") {
        setUserState(r.data);
        navigate("/");
      } else {
        setUserState(UserInit);
        setModal({ status: true, type: "alert", msg: "로그인 실패" });
      }
    });
  }, [id, pw]);

  return (
    <LayoutCloseForm title={"로그인"}>
      <InputId state={setId} />
      <InputPassword state={setPw} onEnter={onSubmitHandler} />
      <div className="btn-wrap">
        <BtnRequest confirm={id.state && pw.state} onClick={onSubmitHandler}>
          로그인
        </BtnRequest>
      </div>
    </LayoutCloseForm>
  );
}
