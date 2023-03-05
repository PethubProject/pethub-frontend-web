import {
  faBars,
  faClipboardList,
  faDog,
  faHouse,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BottomTabNavigation() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        height: 52,
        width: "100%",
        position: "fixed",
        bottom: 0,
        padding: "0 0 4px 0",
        backgroundColor: "white",
      }}
    >
      <div style={navItemStyle}>
        <FontAwesomeIcon icon={faHouse} size={"2x"} />
        <span>홈</span>
      </div>
      <div style={navItemStyle}>
        <FontAwesomeIcon icon={faUserDoctor} size={"2x"} />
        <span>상담게시판</span>
      </div>
      <div style={navItemStyle}>
        <FontAwesomeIcon icon={faDog} size={"2x"} />
        <span>AI 진단</span>
      </div>
      <div style={navItemStyle}>
        <FontAwesomeIcon icon={faClipboardList} size={"2x"} />
        <span>진료내역</span>
      </div>
      <div style={navItemStyle}>
        <FontAwesomeIcon icon={faBars} size={"2x"} />
        <span>더보기</span>
      </div>
    </div>
  );
}

const navItemStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 12,
  gap: 6,
  cursor: "pointer",
};
