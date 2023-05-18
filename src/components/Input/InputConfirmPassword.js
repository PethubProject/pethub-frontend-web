import { useCallback, useEffect, useState } from "react";
import "./input.css";
export default function InputConfirmPassword({
  state = () => {},
  password = "",
  labelText = "비밀번호 확인",
  placeholder = "비밀번호 확인",
}) {
  const [focusClass, setFocusClass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    state: false,
    msg: "",
  });
  useEffect(() => {
    setConfirmPassword((p) => {
      if (password !== p.value && p.value.replace(/[\s]+/gi, "").length > 0) {
        p = { ...p, msg: "비밀번호와 일치 하지 않습니다.", state: false };
        setFocusClass("warning");
      } else if (
        password === p.value &&
        p.value.replace(/[\s]+/gi, "").length > 0
      ) {
        p = { ...p, msg: "확인", state: true };
        setFocusClass("complete");
      } else {
        p = { ...p, msg: "", state: false };
      }
      return p;
    });
  }, [password]);
  useEffect(() => {
    state(confirmPassword);
  }, [confirmPassword, state]);
  const onChangeHandler = useCallback(
    (e) => {
      const { value } = e.target;
      setConfirmPassword((p) => {
        if (value.replace(/[\s]+/gi, "").length === 0) {
          p = { ...p, msg: "", state: false };
          setFocusClass("");
        } else if (!/^(?=.*[A-Za-z])[A-Za-z\d@$!%*#?&]{4,}$/g.test(value)) {
          // (?=.*[@$!%*#?&])
          p = { ...p, msg: "비밀번호 4~20이내", state: false };
          setFocusClass("warning");
        } else if (password !== value) {
          p = { ...p, msg: "비밀번호와 일치 하지 않습니다.", state: false };
          setFocusClass("warning");
        } else {
          p = { ...p, msg: "확인", state: true };
          setFocusClass("complete");
        }
        return { ...p, value: value };
      });
    },
    [password]
  );
  return (
    <div className="input-item">
      <label>
        <span>{labelText}</span>
        <small>{confirmPassword.msg}</small>
      </label>
      <div className={focusClass}>
        <input
          type="password"
          value={confirmPassword.value}
          onChange={onChangeHandler}
          onInput={onChangeHandler}
          onPaste={onChangeHandler}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
