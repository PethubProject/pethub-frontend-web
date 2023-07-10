import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import useApiHooks from "../../api/BaseApi";
import BtnClose from "../../components/Button/BtnClose";
import BtnRegister from "../../components/Button/BtnRegister";
import InputNickName from "../../components/Input/InputNickName";
import "../../components/List/list.css";
import { UserState } from "../../state/User";
import "./userInfo.css";
import { ConfirmModal } from "../../components/Modal/Modals";
export default function ChangeUserNickName() {
  const [modal, setModal] = useState(false);
  const [nickname, setNickname] = useState({
    value: "",
    state: false,
    msg: "",
  });
  const [reset,setReset] = useState(false)
  const setUser= useSetRecoilState(UserState);
  const { postApi, putApi } = useApiHooks();
  const upadateNickname = useCallback(
    async () => {
      if(!nickname?.state){
        alert("닉네임을 입력해주세요")
        return false;
      }
      let result = await putApi({
        url: "/api/user/change-nickname",
        data: {nickname:nickname.value},
      });
      if (result.status !== 200) {
        alert("닉네임이 존재합니다.");
        return;
      }else{
        alert("닉네임 변경 완료")
        setUser(p=>({...p,nickname:nickname.value}))
        onClose()
        return;
      }

     
    },
    [nickname]
  );
  const onClose = useCallback(() => {
    setModal(false);
    setReset(true);
    
  }, []);
  return (
    <>
      <div
        className="pointer"
        onClick={(e) => {
          setReset(false)
          setModal(true);
        }}
      >
        <FontAwesomeIcon icon={faPenToSquare} />
        <span>닉네임 변경</span>
      </div>
      <ConfirmModal
        modalIsOpen={modal}
        close={onClose}
        confirm={() => {
          
          upadateNickname();
        }}
      >
        <div className="flex-column" style={{ gap: "16px" }}>
          <InputNickName state={setNickname} reset={reset}/>
        </div>
      </ConfirmModal>
    </>
  );
}
