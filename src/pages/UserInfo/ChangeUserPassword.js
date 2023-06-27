import { useCallback, useState } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import useApiHooks from "../../api/BaseApi";
import BtnClose from "../../components/Button/BtnClose";
import BtnRegister from "../../components/Button/BtnRegister";
import InputConfirmPassword from "../../components/Input/InputConfirmPassword";
import InputPassword from "../../components/Input/InputPassword";
import "../../components/List/list.css";
import { modalState } from "../../components/Modal/Modal";
import { UserState } from "../../state/User";
import "./userInfo.css";
export default function ChangeUserPassword() {
  const setModal = useSetRecoilState(modalState);
  return (
    <div
      className="pointer list-item v-exp"
      onClick={(e) => {
        setModal({
          status: true,
          type: "popup",
          head: "비밀번호변경",
          body: <ChangePassword />,
        });
      }}
    >
      <div>비밀번호 변경</div>
    </div>
  );
}
function ChangePassword() {
  const [prevPw, setPrevPw] = useState({ value: "" });
  const [newPw, setNewPw] = useState({ value: "" });
  const [confirmNewPw, setConfirmNewPw] = useState({ value: "" });
  const reset = useResetRecoilState(modalState);
  const [user, setUser] = useRecoilState(UserState);
  const { postApi, putApi, getApi } = useApiHooks();
  const updatePassword = useCallback(
    async (data) => {
      let result = await postApi({
        url: "/api/auth/check-pw",
        data: data,
      });
      if (result.status !== 200) {
        alert(result.data);
        return;
      }

      // result = await putApi({
      //   url: "/api/user",
      //   data: data,
      // });
      // if (result.status === 200) {
      //   setUser((p) => ({ ...p, ...data }));
      //   reset();
      // }
    },
    [prevPw]
  );
  return (
    <>
      <div className="flex-column" style={{ gap: "16px" }}>
        <InputPassword state={setPrevPw} labelText={"현재 비밀번호"} />
        <InputPassword state={setNewPw} labelText={"새 비밀번호"} />
        <InputConfirmPassword
          state={setConfirmNewPw}
          password={newPw}
          labelText={"새 비밀번호 확인"}
        />

        <div className="btn-wrap">
          <BtnRegister
            text="변경"
            onClick={() => {
              updatePassword({ ...user, password: prevPw.value });
            }}
          />
          <BtnClose
            onClick={() => {
              reset();
            }}
          />
        </div>
      </div>
    </>
  );
}
