import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./button.css";
export default function BtnCloseIcon({ onClick = () => {} }) {
  return (
    <div className="btn" onClick={onClick}>
      <FontAwesomeIcon icon={faClose} />
    </div>
  );
}
