import { useNavigate } from "react-router-dom";
import HeaderMain from "../../components/Header/HeaderMain";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";
import "./main.css";
import { useRecoilValue } from "recoil";
import { UserState } from "../../state/User";
export default function Main() {
  const navigate = useNavigate();
  const user = useRecoilValue(UserState);
  console.log(user);
  return (
    <div id="main">
      <HeaderMain />
      <div id="main-content" className="content">
        <div id="main-slogan">
          <p>PET HUB</p>
          <p>반려동물 비대면 진료</p>
        </div>
        <div id="main-btn-wrap">
          <div>
            <div
              className="btn-fill bg-main"
              onClick={() => {
                navigate("/cameraselect");
              }}
            >
              AI 진단
            </div>
          </div>
          <div className="flex-row-between">
            <div
              className="btn-only-border"
              onClick={() => {
                navigate("/chat");
              }}
            >
              <span>상담</span>
              <span> 채팅</span>
            </div>
            <div
              className="btn-only-border"
              onClick={() => {
                navigate("/counselboard");
              }}
            >
              <span>상담 </span>
              <span>게시판</span>
            </div>
            <div
              className="btn-only-border"
              onClick={() => {
                navigate("/telehealth");
              }}
            >
              <span>비대면</span>
              <span>진료</span>
            </div>
          </div>
          <div className="flex-row-between">
            <div
              className="btn-only-border"
              onClick={() => {
                navigate("/userinfo");
              }}
            >
              <span>내</span>
              <span>정보</span>
            </div>
            <div
              className="btn-only-border"
              onClick={() => {
                navigate("/petinfo");
              }}
            >
              <span>반려견 </span>
              <span>정보</span>
            </div>
            {/* <div
              className="btn-only-border"
              onClick={() => {
                navigate("/freeboard");
              }}
            >
              <span>자유</span>
              <span>게시판</span>
            </div> */}
          </div>
        </div>
      </div>
      <BottomTabNavigation />
    </div>
  );
}
