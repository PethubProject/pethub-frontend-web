import { useLocation } from "react-router-dom";
import PieChart from "../../components/Chart/PieChart";
import HeaderAi from "../../components/Header/HeaderAi";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";
import "./camera.css";
import { useEffect, useState } from "react";
export default function CameraDetail() {
  const location = useLocation();
  const [predictResult, setPredictResult] = useState({});
  const [imgSrc, setImgSrc] = useState("");
  useEffect(() => {
    setPredictResult(location.state.data["클래스별_예측도"]);
    setImgSrc(location.state.imageSrc);
  }, []);
  return (
    <div id="main">
      <HeaderAi />
      <div id="camera-detail" className="content">
        <div id="ai-graph">
          {Object.keys(predictResult)
            .sort((a, b) => {
              return predictResult[b] - predictResult[a];
            })
            .map((k) => {
              return (
                <div key={Math.random()}>
                  <PieChart r={20} per={predictResult[k]} stroke={"#3eebad"} />
                  <span>{k}</span>
                </div>
              );
            })}
        </div>
        <div id="ai-result">
          <span className="title">사진</span>
          <div id="camera-shot">
            {/* <img src={location.state.imageSrc} alt="사진 결과" /> */}
            {imgSrc && <img src={location.state.imageSrc} alt="사진 결과" />}
          </div>
          {/* <span className="title">결과</span>
          <div>
            <p>{location.state.data["예측값"]}</p>
          </div> */}
        </div>
      </div>
      <BottomTabNavigation />
    </div>
  );
}
