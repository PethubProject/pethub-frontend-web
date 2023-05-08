import { useCallback, useEffect, useState } from "react";
import "./input.css";
export default function InputNickName({
  state = () => {},
  onEnter = () => {},
}) {
  const [focusClass, setFocusClass] = useState("");
  const [nickName, setNickName] = useState({
    value: "",
    state: false,
    msg: "",
  });
  useEffect(() => {
    state(nickName);
  }, [nickName]);
  const onChangeHandler = useCallback((e) => {
    const { value } = e.target;
    setNickName((p) => {
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
        <span>닉네임</span>
        <small>{nickName.msg}</small>
      </label>
      <div className={focusClass}>
        <input
          type="text"
          value={nickName.value}
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
