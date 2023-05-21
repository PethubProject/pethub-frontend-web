import React from "react";
import { useSetRecoilState } from "recoil";
import useApiHooks from "../../api/BaseApi";
import { UserInit, UserState } from "../../state/User";
import { useNavigate } from "react-router-dom";
import UserWrapper from "../../components/Wrapper/UserWrapper";
export default function SignOut() {
  const { apiSignOut } = useApiHooks();
  const reset = useSetRecoilState(UserState);
  const navigate = useNavigate();
  return (
    <div
      className="list-item v-exp"
      onClick={() => {
        apiSignOut().then((r) => {
          reset(UserInit);
          navigate("/");
        });
      }}
    >
      로그아웃
    </div>
  );
}
