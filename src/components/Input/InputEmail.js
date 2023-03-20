import { useCallback, useEffect, useState } from "react";
import "./input.css";
export default function InputEmail({ state = () => {} }) {
  const [focusClass, setFocusClass] = useState("");
  const [email, setEmail] = useState({
    value: "",
    state: false,
    msg: "",
  });
  useEffect(() => {
    state(email);
  }, [email]);
  const onChangeHandler = useCallback((e) => {
    const { value } = e.target;
    setEmail((p) => {
      if (value.replace(/[\s]+/gi, "").length === 0) {
        p = { ...p, msg: "", state: false };
        setFocusClass("");
      } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        // (?=.*[@$!%*#?&])
        p = { ...p, msg: "이메일을 확인해 주세요.", state: false };
        setFocusClass("warning");
      } else {
        p = { ...p, msg: "확인", state: true };
        setFocusClass("complete");
      }
      return { ...p, value: value };
    });
  }, []);
  return (
    <div className="input-item">
      <label>
        <span>이메일</span>
        <small>{email.msg}</small>
      </label>
      <div className={focusClass}>
        <input
          type="email"
          value={email.value}
          onChange={onChangeHandler}
          placeholder="이메일"
        />
      </div>
    </div>
  );
}
