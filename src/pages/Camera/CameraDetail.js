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
          {Object.keys(location.state.data["클래스별_예측도"]).map((k) => {
            return (
              <div key={Math.random()}>
                <PieChart
                  r={20}
                  per={location.state.data["클래스별_예측도"][k]}
                  stroke={"#3eebad"}
                />
                <span>{k}</span>
              </div>
            );
          })}
        </div>
        <div id="ai-result">
          <div id="camera-shot">
            <span className="title">사진</span>
            <img src={location.state.imageSrc} alt="사진 결과" />
          </div>
          <div>
            <span className="title">결과</span>
            <p>{location.state.data["예측값"]}</p>
          </div>
        </div>
      </div>
      <BottomTabNavigation />
    </div>
  );
}
