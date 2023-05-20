import { useCallback, useEffect, useState } from "react";
import "./input.css";
export default function InputPassword({
  state = () => {},
  onEnter = () => {},
  labelText = "비밀번호",
  placeholder = "비밀번호",
}) {
  const [focusClass, setFocusClass] = useState("");
  const [password, setPassword] = useState({
    value: "",
    state: false,
    msg: "",
  });
  useEffect(() => {
    state(password);
  }, [password]);
  const onChangeHandler = useCallback((e) => {
    const { value } = e.target;
    setPassword((p) => {
      if (value.replace(/[\s]+/gi, "").length === 0) {
        p = { ...p, msg: "", state: false };
        setFocusClass("");
      } else if (
        !/^(?=.*[A-Za-z])[A-Za-z\d@$!%*#?&]{4,}$/g.test(value)
        // !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{4,}$/g.test(value)
      ) {
        // (?=.*[@$!%*#?&])
        p = { ...p, msg: "비밀번호 4~20이내", state: false };
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
        <span>{labelText}</span>
        <small>{password.msg}</small>
      </label>
      <div className={focusClass}>
        <input
          type="password"
          value={password.value}
          onChange={onChangeHandler}
          onInput={onChangeHandler}
          onPaste={onChangeHandler}
          placeholder={placeholder}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onEnter(e);
            }
          }}
        />
      </div>
    </div>
  );
}
