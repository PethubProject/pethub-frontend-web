import MainHeader from "../../components/header/MainHeader";
import BottomNavigate from "../../components/navigate/BottomNavigate";
import "./main.css";
export default function Main() {
  return (
    <div id="main">
      <MainHeader />
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
            <div className="btn-only-border">
              <span>수의사</span>
              <span> 정보</span>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigate />
    </div>
  );
}
