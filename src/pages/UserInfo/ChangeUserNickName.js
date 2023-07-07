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
export default function ChangeUserNickName() {
  return (
    <div className="pointer" onClick={(e) => {}}>
      <FontAwesomeIcon icon={faPenToSquare} />
      <span>닉네임 변경</span>
    </div>
  );
}
function ChangeNickName() {
  const [nickname, setNickname] = useState({ value: "" });
  const [user, setUser] = useRecoilState(UserState);
  const { postApi, putApi } = useApiHooks();
  const upadateNickname = useCallback(
    async (data) => {
      let result = await postApi({
        url: "/api/auth/duplicate-nickname",
        data: data,
      });
      if (result.status !== 200) {
        alert("닉네임이 존재합니다.");
        return;
      }

      result = await putApi({
        url: "/api/user",
        data: data,
      });
      if (result.status === 200) {
        setUser((p) => ({ ...p, ...data }));
      }
    },
    [nickname]
  );
  return (
    <>
      <div className="flex-column">
        <InputNickName state={setNickname} />
        <div className="btn-wrap">
          <BtnRegister
            text="변경"
            onClick={() => {
              upadateNickname({ ...user, nickname: nickname.value });
            }}
          />
          <BtnClose onClick={() => {}} />
        </div>
      </div>
    </>
  );
}
