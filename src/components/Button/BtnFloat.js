import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./button.css";
export default function BtnFloat({ onClick,icon }) {
  return (
    <div
      className="btn-float"
      onClick={(e) => {
        onClick(e);
      }}
    >
      {icon?icon:<FontAwesomeIcon icon={faPen} />}
    </div>
  );
}
