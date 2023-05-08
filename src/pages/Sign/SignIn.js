import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import BtnRequest from "../../components/Button/BtnRequest";
import InputId from "../../components/Input/InputId";
import InputPassword from "../../components/Input/InputPassword";
import LayoutCloseForm from "../../components/Layout/LayoutCloseForm";
import { modalState } from "../../components/Modal/Modal";
import "./sign.css";
import { UserInit, UserState } from "../../state/User";
// img
import dog from "../../resources/image/dog_ani_img.png";
import vet from "../../resources/image/vet_ani_img.png";
import InputEmail from "../../components/Input/InputEmail";
import { postApi } from "../../api/BaseApi";
import { apiSignIn } from "../../api/SignApi";

export default function SignIn() {
  const [email, setEmail] = useState({});
  const [pw, setPw] = useState({});
  const navigate = useNavigate();
  const setModal = useSetRecoilState(modalState);
  const setUserState = useSetRecoilState(UserState);
  // const [userToken, setUserToken] = useRecoilState(UserTokenState);

  const [type, setType] = useState("dog");
  const onSubmitHandler = useCallback(async () => {
    apiSignIn({ email: email.value, password: pw.value }).then((r) => {
      if (r.ok) {
        setUserState(r.data);
        navigate("/");
      } else {
        alert(r.msg);
      }
    });
  }, [email, pw]);

  return (
    <LayoutCloseForm title={"로그인"}>
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
      <InputEmail state={setEmail} />
      <InputPassword state={setPw} onEnter={onSubmitHandler} />
      <div className="btn-wrap">
        <BtnRequest confirm={email.state && pw.state} onClick={onSubmitHandler}>
          로그인
        </BtnRequest>
      </div>
    </LayoutCloseForm>
  );
}
