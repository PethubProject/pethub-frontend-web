import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./navigation.css";
import { faBars, faClipboardList, faDog, faHouse, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

export default function BottomTabNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div id="bottom-nav" className="flex-row-between">
      <div
        className={`flex-column flex-align-center pointer ${location.pathname === "/" && "nav-active"}`}
        onClick={() => {
          navigate("/");
        }}
      >
        <FontAwesomeIcon icon={faHouse} size={"2x"} />
        <span>홈</span>
      </div>
      <div className={`flex-column flex-align-center pointer ${location.pathname === "/consultBoard" && "nav-active"}`}>
        <FontAwesomeIcon icon={faUserDoctor} size={"2x"} />
        <span>상담게시판</span>
      </div>
      <div
        className={`flex-column flex-align-center pointer ${
          // location.pathname === "/ai" && "nav-active"
          /\/ai/.test(location.pathname) && "nav-active"
        }`}
        onClick={() => {
          navigate("/cameraselect");
        }}
      >
        <FontAwesomeIcon icon={faDog} size={"2x"} />
        <span>AI 진단</span>
      </div>
      <div className={`flex-column flex-align-center pointer ${location.pathname === "/medicalList" && "nav-active"}`}>
        <FontAwesomeIcon icon={faClipboardList} size={"2x"} />
        <span>진료내역</span>
      </div>
      <div
        className={`flex-column flex-align-center pointer ${location.pathname === "/more" && "nav-active"}`}
        onClick={() => {
          navigate("/more");
        }}
      >
        <FontAwesomeIcon icon={faBars} size={"2x"} />
        <span>더보기</span>
      </div>
    </div>
  );
}
