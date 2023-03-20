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
// img
import dog from "../../resources/image/dog_ani_img.png";
import vet from "../../resources/image/vet_ani_img.png";

export default function SignIn() {
  const [id, setId] = useState({});
  const [pw, setPw] = useState({});
  const navigate = useNavigate();
  const setModal = useSetRecoilState(modalState);
  const setUserState = useSetRecoilState(UserState);
  // const [userToken, setUserToken] = useRecoilState(UserTokenState);

  const [type, setType] = useState("dog");
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
      <InputPassword state={setPw} onEnter={onSubmitHandler} />
      <div className="btn-wrap">
        <BtnRequest confirm={id.state && pw.state} onClick={onSubmitHandler}>
          로그인
        </BtnRequest>
      </div>
    </LayoutCloseForm>
  );
}
