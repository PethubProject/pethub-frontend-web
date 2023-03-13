import { useCallback, useEffect, useState } from "react";
import "./input.css";
export default function InputConfirmPassword({
  state = () => {},
  password = "",
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
        console.log(password);
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
        } else if (
          !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/g.test(value)
        ) {
          // (?=.*[@$!%*#?&])
          p = { ...p, msg: "비밀번호 8~20이내", state: false };
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
        <span>비밀번호 확인</span>
        <small>{confirmPassword.msg}</small>
      </label>
      <div className={focusClass}>
        <input
          type="password"
          value={confirmPassword.value}
          onChange={onChangeHandler}
          placeholder="비밀번호 확인"
        />
      </div>
    </div>
  );
}
