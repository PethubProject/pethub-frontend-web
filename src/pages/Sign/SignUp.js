import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import BtnRequest from "../../components/Button/BtnRequest";
import { modalState } from "../../components/Modal/Modal";
import InputConfirmPassword from "../../components/Input/InputConfirmPassword";
import InputEmail from "../../components/Input/InputEmail";
import InputId from "../../components/Input/InputId";
import InputPassword from "../../components/Input/InputPassword";
import LayoutCloseForm from "../../components/Layout/LayoutCloseForm";

export default function SignUp() {
  const [id, setId] = useState({});
  const [pw, setPw] = useState({});
  const [email, setEmail] = useState({});
  const [confirmPw, setConfirmPw] = useState({});
  const [modal, setModal] = useRecoilState(modalState);
  const navigate = useNavigate();

  return (
    <LayoutCloseForm title={"회원가입"}>
      <InputId state={setId} />
      <InputEmail state={setEmail} />
      <InputPassword state={setPw} />
      <InputConfirmPassword state={setConfirmPw} password={pw.value} />
      <div className="btn-wrap">
        <BtnRequest
          confirm={id.state && pw.state && confirmPw.state && email.state}
          onClick={() => {}}
        >
          회원가입
        </BtnRequest>
      </div>
    </LayoutCloseForm>
  );
}
