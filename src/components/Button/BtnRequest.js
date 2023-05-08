import { useEffect, useState } from "react";
import "./button.css";

export default function BtnRequest({
  children,
  onClick = () => {},
  confirm = false,
}) {
  const [className, setClassName] = useState("required");
  useEffect(() => {
    if (confirm) {
      setClassName("request");
    } else {
      setClassName("required");
    }
  }, [confirm]);
  return (
    <div
      className={`btn btn-basic btn-${className}`}
      onClick={confirm ? onClick : () => {}}
    >
      {children}
    </div>
  );
}
