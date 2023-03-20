import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function BtnGoBack() {
  const nav = useNavigate();
  return (
    <div
      className="btn"
      onClick={() => {
        nav(-1);
      }}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </div>
  );
}
