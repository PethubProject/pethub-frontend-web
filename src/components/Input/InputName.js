import { useCallback, useEffect, useState } from "react";
import "./input.css";
export default function InputName({
  labelText = "이름",
  state = () => {},
  onEnter = () => {},
}) {
  const [focusClass, setFocusClass] = useState("");
  const [name, setName] = useState({
    value: "",
    state: false,
    msg: "",
  });
  useEffect(() => {
    state(name);
  }, [name]);
  const onChangeHandler = useCallback((e) => {
    const { value } = e.target;
    setName((p) => {
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
        <small>{name.msg}</small>
      </label>
      <div className={focusClass}>
        <input
          type="text"
          value={name.value}
          onChange={onChangeHandler}
          placeholder="이름"
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
