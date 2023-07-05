import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import BtnRequest from "../../components/Button/BtnRequest";
import InputConfirmPassword from "../../components/Input/InputConfirmPassword";
import InputEmail from "../../components/Input/InputEmail";
import InputPassword from "../../components/Input/InputPassword";
import LayoutCloseForm from "../../components/Layout/LayoutCloseForm";
import { modalState } from "../../components/Modal/Modal";
// img
import InputPhone from "../../components/Input/InputPhone";
import dog from "../../resources/image/dog_ani_img.png";
import vet from "../../resources/image/vet_ani_img.png";
// import InputNickName from "../../components/Input/InputNickName";
import useApiHooks from "../../api/BaseApi";
import InputName from "../../components/Input/InputName";

export default function SignUp() {
  const [pw, setPw] = useState({});
  const [email, setEmail] = useState({});
  const [confirmPw, setConfirmPw] = useState({});
  const [phoneNumber, setPhoneNumber] = useState({});
  const [nickname, setNickname] = useState({});
  const [name, setName] = useState({});
  const [modal, setModal] = useRecoilState(modalState);
  const navigate = useNavigate();
  const { apiSignUp } = useApiHooks();
  const [type, setType] = useState("OWNER");
  return (
    <LayoutCloseForm title={"회원가입"}>
      <div id="select-type">
        <div
          className={type === "OWNER" ? "sign-selected" : ""}
          onClick={() => {
            setType("OWNER");
          }}
        >
          <img src={dog} alt="dog" />
          <span>반려동물</span>
        </div>
        <div
          className={type === "VET" ? "sign-selected" : ""}
          onClick={() => {
            setType("VET");
          }}
        >
          <img src={vet} alt="vet" />
          <span>수의사</span>
        </div>
      </div>
      <InputEmail state={setEmail} />
      {/* <InputNickName state={setNickname} /> */}
      <InputName state={setName} />
      <InputPassword state={setPw} />
      <InputConfirmPassword state={setConfirmPw} password={pw.value} />
      <InputPhone state={setPhoneNumber} />
      <div className="btn-wrap">
        <BtnRequest
          confirm={
            pw.state &&
            confirmPw.state &&
            email.state &&
            phoneNumber.state &&
            name.state
            // &&
            // nickname.state
          }
          onClick={() => {
            apiSignUp({
              email: email.value,
              // nickname: nickname.value,
              name: name.value,
              password: pw.value,
              callNumber: phoneNumber.value,
              role: type,
            }).then((r) => {
              if (r.ok) {
                navigate("/signin");
              } else {
                alert(r.msg);
              }
            });
          }}
        >
          회원가입
        </BtnRequest>
      </div>
    </LayoutCloseForm>
  );
}
