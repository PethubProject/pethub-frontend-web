import { useState, forwardRef } from "react";

export const ValidInput = forwardRef(
  ({ label, type, setState, valid, regEx, children }, ref) => {
    const [id, setId] = useState("");

    function onChangeHandler(value, regEx) {
      setId(value);
      setState(value);
      valid(value, regEx.test(value));
    }
    return (
      <div>
        <label>{label}</label>
        <input
          ref={ref}
          type={type}
          onChange={(e) => {
            const { value } = e.target;
            onChangeHandler(value, regEx);
          }}
          value={id}
          required
        />
        {children}
      </div>
    );
  }
);
