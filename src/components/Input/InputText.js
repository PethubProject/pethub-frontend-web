import { useCallback, useEffect, useState } from "react";
import "./input.css";
export default function InputText({ state = () => {}, onEnter = () => {}, placeholder, label }) {
  const [focusClass, setFocusClass] = useState("");
  const [text, setText] = useState("");

  const onChangeHandler = useCallback((e) => {
    const { value } = e.target;
    setText(value);
    state(value);
  }, []);
  return (
    <div className="input-item padding-h-regular">
      <label>
        <span>{label || ""}</span>
      </label>
      <div className={focusClass}>
        <input
          type="text"
          value={text}
          onChange={onChangeHandler}
          placeholder={placeholder || ""}
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
