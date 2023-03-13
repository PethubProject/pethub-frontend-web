import { useNavigate } from "react-router-dom";
import HeaderMain from "../../components/Header/HeaderMain";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";
import "./main.css";
export default function Main() {
  const navigate = useNavigate();
  return (
    <div id="main">
      <HeaderMain />
      <div className="content flex-center">
        <div id="main-btn-wrap">
          <div>
            <div className="btn-fill bg-main">AI 진단</div>
          </div>
          <div className="flex-row-between">
            <div className="btn-only-border">
              <span>상담</span>
              <span> 채팅</span>
            </div>
            <div className="btn-only-border">
              <span>상담 </span>
              <span>게시판</span>
            </div>
            <div
              className="btn-only-border"
              onClick={() => {
                navigate("/freeboard");
              }}
            >
              <span>자유</span>
              <span>게시판</span>
            </div>
          </div>
        </div>
      </div>
      <BottomTabNavigation />
    </div>
  );
}
