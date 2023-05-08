import { useCallback, useEffect, useState } from "react";
import "./input.css";
export default function InputPhone({ state = () => {}, onEnter = () => {} }) {
  const [focusClass, setFocusClass] = useState("");
  const [phoneNumber, setPhoneNumber] = useState({
    value: "",
    state: false,
    msg: "",
  });
  useEffect(() => {
    state(phoneNumber);
  }, [phoneNumber]);
  const onChangeHandler = useCallback((e) => {
    const { value } = e.target;
    setPhoneNumber((p) => {
      if (value.replace(/[\s]+/gi, "").length === 0) {
        p = { ...p, msg: "", state: false };
        setFocusClass("");
      } else if (
        !/^\d{3}\d{3,4}\d{4}$/.test(value.replace("-", ""))
        // !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{4,}$/g.test(value)
      ) {
        // (?=.*[@$!%*#?&])
        p = { ...p, msg: "전화번호를 잘 못 입력하셨습니다.", state: false };
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
        <span>전화번호</span>
        <small>{phoneNumber.msg}</small>
      </label>
      <div className={focusClass}>
        <input
          type="text"
          value={phoneNumber.value}
          onChange={onChangeHandler}
          placeholder="전화번호"
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
