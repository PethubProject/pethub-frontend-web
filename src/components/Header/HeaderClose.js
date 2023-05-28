import { useNavigate } from "react-router-dom";
import BtnCloseIcon from "../Button/BtnCloseIcon";
import "./header.css";
export default function HeaderClose(props) {
  const navigate = useNavigate();
  return (
    <header>
      <div id="title">{props.title}</div>
      <div id="right">
        <BtnCloseIcon
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
    </header>
  );
}
