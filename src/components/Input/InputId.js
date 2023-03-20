import { useCallback, useEffect, useRef, useState } from "react";
import "./input.css";
export default function InputId({ state = () => {} }) {
  const idRef = useRef();
  const [focusClass, setFocusClass] = useState("");
  const [id, setId] = useState({ value: "", state: false, msg: "" });
  useEffect(() => {
    state(id);
  }, [id]);
  const onChangeHandler = useCallback((e) => {
    const { value } = e.target;
    setId((p) => {
      if (value.replace(/[\s]+/gi, "").length === 0) {
        p = { ...p, msg: "", state: false };
        setFocusClass("");
      } else if (!/^[a-zA-Z\d]{5,20}$/g.test(value)) {
        p = { ...p, msg: "아이디 5~20이내", state: false };
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
        <span>아이디</span>
        <small>{id.msg}</small>
      </label>
      <div className={focusClass}>
        <input
          ref={idRef}
          type="id"
          value={id.value}
          onChange={onChangeHandler}
          placeholder="아이디"
        />
      </div>
    </div>
  );
}
