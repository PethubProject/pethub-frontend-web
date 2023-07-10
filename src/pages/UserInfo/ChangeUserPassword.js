import { useCallback, useState } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import useApiHooks from "../../api/BaseApi";
import BtnClose from "../../components/Button/BtnClose";
import BtnRegister from "../../components/Button/BtnRegister";
import InputConfirmPassword from "../../components/Input/InputConfirmPassword";
import InputPassword from "../../components/Input/InputPassword";
import "../../components/List/list.css";
import { UserState } from "../../state/User";
import "./userInfo.css";
import { ConfirmModal } from "../../components/Modal/Modals";
export default function ChangeUserPassword() {
  const [modal, setModals] = useState(false);
  const [prevPw, setPrevPw] = useState({ value: "" });
  const [newPw, setNewPw] = useState({ value: "" });
  const [confirmNewPw, setConfirmNewPw] = useState({ value: "" });
  const [user, setUser] = useRecoilState(UserState);
  const { postApi, putApi, getApi } = useApiHooks();
  const [reset,setReset] = useState(false)
  const updatePassword = useCallback(
    async () => {
      let result = await putApi({
        url: "/api/user/change-pw",
        data: {password:prevPw.value,newPassword:newPw.value},
      });
      
      if (result.status !== 200) {
        alert(result.data.message);
        return;
      } else{
        alert("비밀번호 변경 완료")
        onClose()
        return
      }
      // result = await putApi({
      //   url:"/api/user/change-pw",
      //   data:{newPassword:newPw.value}
      // })
      // console.log(result)
    },
    [prevPw,newPw]
  );
  const onClose = useCallback(()=>{
      setModals(false);
      setReset(true)
  },[])
  return (
    <>
      <div
        className="pointer list-item v-exp"
        onClick={(e) => {
          setReset(false)
          setModals(true);
        }}
      >
        <div>비밀번호 변경</div>
      </div>
      <ConfirmModal
        modalIsOpen={modal}
        close={onClose}
        confirm={()=>{
          updatePassword()
        }}
      >
        <div className="flex-column" style={{ gap: "16px" }}>
          <InputPassword state={setPrevPw} labelText={"현재 비밀번호"} reset={reset}/>
          <InputPassword state={setNewPw} labelText={"새 비밀번호"} reset={reset} />
          <InputConfirmPassword state={setConfirmNewPw} password={newPw.value} labelText={"새 비밀번호 확인"} reset={reset} />
        </div>
      </ConfirmModal>
    </>
  );
}
