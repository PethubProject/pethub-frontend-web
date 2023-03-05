import React, { useRef, useState } from "react";
import { ValidInput } from "../../components/Sign/Validation";
import { Goback } from "../../components/Button/GoBack";
import { RegisterBtn } from "../../components/Button/Register";
import axios from "axios";

export default function SignUp() {
  const [id, setId] = useState("");
  const [idState, setIdState] = useState(false);
  const [pw, setPw] = useState("");
  const [pwState, setPwState] = useState(false);
  const idRef = useRef(null);
  return (
    <div>
      <ValidInput
        ref={idRef}
        type="id"
        label={"아이디"}
        setState={setId}
        valid={(_, condition) => {
          setIdState(condition);
        }}
        regEx={/^[a-z][a-zA-Z0-9]{4,19}$/g}
      >
        {!id.empty() && (
          <span>{idState ? "확인" : "아이디를 확인해 주세요"}</span>
        )}
      </ValidInput>
      <ValidInput
        type="password"
        label={"비밀번호"}
        setState={setPw}
        valid={(_, condition) => {
          setPwState(condition);
        }}
        regEx={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*?&]{4,50}$/g}
      >
        {!pw.empty() && (
          <span>{pwState ? "확인" : "비밀번호를 확인해 주세요"}</span>
        )}
      </ValidInput>

      <RegisterBtn
        onClick={(e) => {
          if (idState && pwState) {
            axios
              .post(process.env.REACT_APP_DEV_URL + "/signin", {
                userId: id,
                userPw: pw,
              })
              .then((r) => console.log(r));
          }
        }}
      >
        로그인
      </RegisterBtn>
      <Goback />
    </div>
  );
}
