import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import BtnRequest from "../../components/Button/BtnRequest";
import InputPassword from "../../components/Input/InputPassword";
import LayoutCloseForm from "../../components/Layout/LayoutCloseForm";
import { modalState } from "../../components/Modal/Modal";
import { UserState } from "../../state/User";
import "./sign.css";
// img
import useApiHooks from "../../api/BaseApi";
import InputEmail from "../../components/Input/InputEmail";
import dog from "../../resources/image/dog_ani_img.png";
import vet from "../../resources/image/vet_ani_img.png";
import { contains, isEmpty } from "../../components/Utils/Utils";

export default function SignIn() {
  const [email, setEmail] = useState({});
  const [pw, setPw] = useState({});
  const navigate = useNavigate();
  const setModal = useSetRecoilState(modalState);
  const setUserState = useSetRecoilState(UserState);
  const location = useLocation();
  // const [userToken, setUserToken] = useRecoilState(UserTokenState);
  const { apiSignIn, getApi } = useApiHooks();
  const [type, setType] = useState("OWNER");
  const onSubmitHandler = useCallback(async () => {
    apiSignIn({ email: email.value, password: pw.value, role: type }).then((r) => {
      if (r.ok) {
        console.log(r);
        const { role, userId } = r.data.data;
        if (role !== type) {
          alert("유저 타입을 다시 선택해 주세요");
          return;
        }

        setUserState((p) => ({
          ...p,
          ...r.data.data,
        }));
        if (role === "VET") {
          getApi({ url: `/api/vet/${userId}` }).then((resp) => {
            setUserState((p) => ({
              ...p,
              info: { ...p.info, ...resp.data.data },
              userImage: r.data.data.vetIamge,
            }));
          });
        }
        if (role === "OWNER") {
          getApi({ url: `/api/owner` }).then((resp) => {
            setUserState((p) => ({
              ...p,
              info: { ...p.info, ...resp.data.data },
            }));
          });
        }

        if (contains(location, "state") && contains(location.state, "prevPath") && !isEmpty(location.state.prevPath)) {
          navigate(location.state.prevPath, { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } else {
        alert(r.msg);
      }
    });
  }, [email, pw, type, location]);

  return (
    <LayoutCloseForm title={"로그인"}>
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
      <InputPassword state={setPw} onEnter={onSubmitHandler} />
      <div className="btn-wrap">
        <BtnRequest confirm={email.state && pw.state} onClick={onSubmitHandler}>
          로그인
        </BtnRequest>
      </div>
    </LayoutCloseForm>
  );
}
