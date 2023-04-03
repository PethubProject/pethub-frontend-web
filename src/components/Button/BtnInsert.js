import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function BtnInsert() {
  const nav = useNavigate();
  return (
    <div
      className="insert_btn"
      onClick={() => {
        nav(`/counselboard/insert`);
      }}
    >
      <FontAwesomeIcon icon={faPen} />
    </div>
  );
}
