import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./navigation.css";
import {
  faBars,
  faClipboardList,
  faDog,
  faHouse,
  faImage,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

export default function BottomFileUpload() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div id="bottom-nav" className="flex-row-between">
      <div className={`flex-column flex-align-center pointer`}>
        <FontAwesomeIcon icon={faImage} size={"2x"} />
      </div>
    </div>
  );
}
