import { useCallback, useState } from "react";
import "./sign.css";
export default function SignUp() {
  const [id, setId] = useState({
    status: false,
    value: "",
    msg: "",
  });
  const [password, setPassword] = useState({
    status: false,
    value: "",
    msg: "",
    reg: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*?&]{4,50}$/g,
  });

  const onIdChangeHandler = useCallback((e) => {
    const { value } = e.target;

    setId((p) => {
      let { status, msg } = p;
      if (!/^[a-z][a-zA-Z0-9]{4,19}$/g.test(value)) {
        status = false;
        msg = "아이디 확인";
      } else {
        status = true;
        msg = "확인";
      }
      return { ...p, value: value, status: status, msg: msg };
    });
  }, []);
  return (
    <div>
      <form>
        <div className="form-item">
          <label>아이디</label>
          <div className="input-wrap">
            <input
              className="border-none"
              type="id"
              required={true}
              placeholder="아이디"
            />
          </div>
        </div>
        <div className="form-item">
          <label>비밀번호</label>
          <div className="input-wrap">
            <input
              className="border-none"
              type="password"
              required={true}
              placeholder="비밀번호"
            />
          </div>
        </div>
        <div className="form-item">
          <label>비밀번호 확인</label>
          <div className="input-wrap">
            <input
              className="border-none"
              type="password"
              required={true}
              placeholder="비밀번호 확인"
            />
          </div>
        </div>
        <div className="form-item">
          <label>이메일</label>
          <div className="input-wrap">
            <input
              className="border-none"
              type="email"
              required={true}
              placeholder="이메일"
            />
          </div>
        </div>
      </form>

      <div id="btn-signin" className="btn-fill bg-main pointer">
        회원가입
      </div>
    </div>
  );
}
