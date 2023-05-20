import { useCallback, useEffect, useState } from "react";
import "./input.css";
export default function InputNickName({
  labelText = "",
  state = () => {},
  onEnter = () => {},
}) {
  const [focusClass, setFocusClass] = useState("");
  const [nickname, setNickname] = useState({
    value: "",
    state: false,
    msg: "",
  });
  useEffect(() => {
    state(nickname);
  }, [nickname]);
  const onChangeHandler = useCallback((e) => {
    const { value } = e.target;
    setNickname((p) => {
      if (value.replace(/[\s]+/gi, "").length === 0) {
        p = { ...p, msg: "공백 없이 입력해주세요.", state: false };
        setFocusClass("");
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
        <small>{nickname.msg}</small>
      </label>
      <div className={focusClass}>
        <input
          type="text"
          value={nickname.value}
          onChange={onChangeHandler}
          placeholder="닉네임"
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
