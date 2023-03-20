import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import BtnRequest from "../../components/Button/BtnRequest";
import InputConfirmPassword from "../../components/Input/InputConfirmPassword";
import InputEmail from "../../components/Input/InputEmail";
import InputId from "../../components/Input/InputId";
import InputPassword from "../../components/Input/InputPassword";
import LayoutCloseForm from "../../components/Layout/LayoutCloseForm";
import { modalState } from "../../components/Modal/Modal";
// img
import dog from "../../resources/image/dog_ani_img.png";
import vet from "../../resources/image/vet_ani_img.png";

export default function SignUp() {
  const [id, setId] = useState({});
  const [pw, setPw] = useState({});
  const [email, setEmail] = useState({});
  const [confirmPw, setConfirmPw] = useState({});
  const [modal, setModal] = useRecoilState(modalState);
  const navigate = useNavigate();
  const [type, setType] = useState("dog");
  return (
    <LayoutCloseForm title={"회원가입"}>
      <div id="select-type">
        <div
          className={type === "dog" ? "sign-selected" : ""}
          onClick={() => {
            setType("dog");
          }}
        >
          <img src={dog} alt="dog" />
          <span>반려동물</span>
        </div>
        <div
          className={type === "vet" ? "sign-selected" : ""}
          onClick={() => {
            setType("vet");
          }}
        >
          <img src={vet} alt="vet" />
          <span>수의사</span>
        </div>
      </div>
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
