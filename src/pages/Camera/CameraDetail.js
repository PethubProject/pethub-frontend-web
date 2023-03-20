import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./camera.css";
import uuid from "react-uuid";
import MainHeader from "../../components/Header/HeaderMain";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";
import PieChart from "../../components/Chart/PieChart";
import HeaderAi from "../../components/Header/HeaderAi";
export default function CameraDetail() {
  const location = useLocation();
  return (
    <div id="main">
      <HeaderAi />
      <div className="content">
        <div></div>
        <div id="ai-graph">
          <div>
            <PieChart r={20} per={0.2} stroke={"#3eebad"} />
            <span>AI 결과 분석 #1</span>
          </div>
          <div>
            <PieChart r={20} per={0.1} stroke={"#6c3eeb"} />
            <span>AI 결과 분석 #2</span>
          </div>
        </div>
        <div id="ai-result">
          <div id="camera-shot">
            <span className="title">사진</span>
            <img src={location.state.imageSrc} alt="사진 결과" />
          </div>
          <div>
            <span className="title">진단 설명</span>
            <p>이렇쿵 저러쿵</p>
          </div>
        </div>
      </div>
      <BottomTabNavigation />
    </div>
  );
}
