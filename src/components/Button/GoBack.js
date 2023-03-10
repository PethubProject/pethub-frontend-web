import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export const Goback = () => {
  const nav = useNavigate();
  return (
    <div
      onClick={() => {
        nav(-1);
      }}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </div>
  );
};
