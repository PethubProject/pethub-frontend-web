import { useCallback, useState } from "react";
import BtnGoHome from "../../components/button/BtnGoHome";
import { EMAIL_REG_EX, ID_REG_EX, PASSWORD_REG_EX } from "../../utils/regEx";
import "./sign.css";
export default function SignUp() {
  const [id, setId] = useState({
    status: false,
    value: "",
    msg: " ",
  });
  const [email, setEmail] = useState({
    status: false,
    value: "",
    msg: " ",
  });
  const [password, setPassword] = useState({
    status: false,
    value: "",
    msg: " ",
  });
  const [confirmPassword, setConfirmPassword] = useState({
    status: false,
    value: "",
    msg: " ",
  });

  const onIdChangeHandler = useCallback((e) => {
    const { value } = e.target;
    setId((p) => {
      let { status, msg } = p;
      if (value.replace(/[\s]+/gi, "").length === 0) {
        status = false;
        msg = " ";
      } else if (!new RegExp(ID_REG_EX).test(value)) {
        status = false;
        msg = "아이디는 5~20자 이내";
      } else {
        status = true;
        msg = "확인";
      }
      return { ...p, value: value, status: status, msg: msg };
    });
  }, []);
  const onEmailChangeHandler = useCallback((e) => {
    const { value } = e.target;
    setEmail((p) => {
      let { status, msg } = p;
      if (value.replace(/[\s]+/gi, "").length === 0) {
        status = false;
        msg = " ";
      } else if (!new RegExp(EMAIL_REG_EX).test(value)) {
        status = false;
        msg = "이메일을 잘 못 입력하였습니다.";
      } else {
        status = true;
        msg = "확인";
      }
      return { ...p, value: value, status: status, msg: msg };
    });
  }, []);
  const onPasswordChangeHandler = useCallback((e) => {
    const { value } = e.target;
    setPassword((p) => {
      let { status, msg } = p;
      if (value.replace(/[\s]+/gi, "").length === 0) {
        status = false;
        msg = " ";
      } else if (!new RegExp(PASSWORD_REG_EX).test(value)) {
        status = false;
        msg = "비밀번호는 8자 이상";
      } else {
        status = true;
        msg = "확인";
      }
      return { ...p, value: value, status: status, msg: msg };
    });
  }, []);
  const onConfirmPasswordChangeHandler = useCallback(
    (e) => {
      const { value } = e.target;
      setConfirmPassword((p) => {
        let { status, msg } = p;
        if (value.replace(/[\s]+/gi, "").length === 0) {
          status = false;
          msg = " ";
        } else if (!new RegExp(PASSWORD_REG_EX).test(value)) {
          status = false;
          msg = "비밀번호는 8자 이상";
        } else if (value !== password.value) {
          status = false;
          msg = "비밀번호와 일치하지 않음";
        } else {
          status = true;
          msg = "확인";
        }
        return { ...p, value: value, status: status, msg: msg };
      });
    },
    [password]
  );
  return (
    <div id="main">
      <div id="sign-up-header">
        <BtnGoHome />
        <span>회원가입</span>
      </div>
      <form id="sign-up-body">
        <div className="form-item">
          <label>아이디</label>
          <div className="input-wrap">
            <input
              onChange={onIdChangeHandler}
              value={id.value}
              className="border-none"
              type="id"
              required={true}
              placeholder="아이디"
            />
          </div>
          <small className={`${!id.status && "text-error"}`}>{id.msg}</small>
        </div>
        <div className="form-item">
          <label>이메일</label>
          <div className="input-wrap">
            <input
              onChange={onEmailChangeHandler}
              value={email.value}
              className="border-none"
              type="email"
              required={true}
              placeholder="이메일"
            />
          </div>
          <small className={`${!email.status && "text-error"}`}>
            {email.msg}
          </small>
        </div>
        <div className="form-item">
          <label>비밀번호</label>
          <div className="input-wrap">
            <input
              onChange={onPasswordChangeHandler}
              value={password.value}
              className="border-none"
              type="password"
              required={true}
              placeholder="비밀번호"
            />
          </div>
          <small className={`${!password.status && "text-error"}`}>
            {password.msg}
          </small>
        </div>
        <div className="form-item">
          <label>비밀번호 확인</label>
          <div className="input-wrap">
            <input
              onChange={onConfirmPasswordChangeHandler}
              value={confirmPassword.value}
              className="border-none"
              type="password"
              required={true}
              placeholder="비밀번호 확인"
            />
          </div>
          <small className={`${!confirmPassword.status && "text-error"}`}>
            {confirmPassword.msg}
          </small>
        </div>
      </form>

      <div
        id="btn-signin"
        className={`btn-fill pointer ${
          id.status && password.status && email.status && confirmPassword.status
            ? "bg-main"
            : "bg-gray"
        }`}
        onClick={() => {
          if (
            !(
              id.status &&
              password.status &&
              email.status &&
              confirmPassword.status
            )
          ) {
            return false;
          } else {
            alert("회원가입");
          }
        }}
      >
        회원가입
      </div>
    </div>
  );
}
