import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ID_REG_EX, PASSWORD_REG_EX } from "../../utils/regEx";
import "./sign.css";
export default function SignIn() {
  const id = useRef();
  const password = useRef();
  const [form, setForm] = useState({ id: "", password: "" });
  const onChangeHandler = useCallback((e) => {
    const { value, name } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }, []);
  const onSubmit = useCallback(() => {
    if (!new RegExp(ID_REG_EX).test(form.id)) {
      id.current.focus();
      return false;
    }
    if (!new RegExp(PASSWORD_REG_EX).test(form.password)) {
      password.current.focus();
      return false;
    }
    alert("성공");
    return false;
  }, [form]);

  return (
    <div>
      <form>
        <div className="form-item">
          <label>아이디</label>
          <div className="input-wrap">
            <input
              ref={id}
              onChange={onChangeHandler}
              value={form.id}
              name="id"
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
              ref={password}
              onChange={onChangeHandler}
              value={form.password}
              name="password"
              className="border-none"
              type="password"
              required={true}
              placeholder="비밀번호"
            />
          </div>
        </div>
      </form>
      <div id="nav-signin" className="span-v-bar flex-row-center">
        <span>아이디 · 비밀번호 찾기</span>
        <span></span>
        <a href="/signup">회원가입</a>
      </div>
      <div
        id="btn-signin"
        className="btn-fill bg-main pointer"
        onClick={onSubmit}
      >
        로그인
      </div>
    </div>
  );
}
