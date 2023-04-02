import { useNavigate } from "react-router-dom";
import "./list.css";

export default function MenuList() {
  const navigate = useNavigate();
  return (
    <div className="list-col">
      <div className="list-item v-exp">내정보</div>
      <div
        className="list-item v-exp"
        onClick={() => {
          navigate("/freeboard");
        }}
      >
        자유게시판
      </div>
      <div
        className="list-item v-exp"
        onClick={() => {
          navigate("/counselboard");
        }}
      >
        상담게시판
      </div>
    </div>
  );
}
