import { useNavigate } from "react-router-dom";
import BtnClose from "../Button/BtnClose";
import "./header.css";
export default function HeaderClose(props) {
  const navigate = useNavigate();
  return (
    <header>
      <div id="title">{props.title}</div>
      <div id="right">
        <BtnClose
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
    </header>
  );
}
