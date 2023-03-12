import axios from "axios";
import { useCallback, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import BtnRequest from "../../components/Button/BtnRequest";
import { modalState } from "../../components/Modal/Modal";
import InputId from "../../components/Input/InputId";
import InputPassword from "../../components/Input/InputPassword";
import LayoutCloseForm from "../../components/Layout/LayoutCloseForm";
import "./sign.css";

export default function SignIn() {
  const [id, setId] = useState({});
  const [pw, setPw] = useState({});
  const navigate = useNavigate();
  const setModal = useSetRecoilState(modalState);
  // const [userToken, setUserToken] = useRecoilState(UserTokenState);
  const onSubmitHandler = useCallback(() => {}, [id, pw]);

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
