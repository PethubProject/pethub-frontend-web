import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

export default function Camera() {
  const webcamRef = useRef();
  const [facingMode, setFacingMode] = useState(getDeviceType().facingMode);
  const [mirrored, setMirrored] = useState(getDeviceType().mirror);
  const videoConstraints = {
    width: { ideal: window.innerHeight * 3 },
    height: { ideal: window.innerWidth * 3 },
  };
  const navigate = useNavigate();
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    navigate("/camera/detail", { state: { imageSrc: imageSrc } });
  }, [webcamRef]);
  console.log({ ...videoConstraints, facingMode: facingMode });
  return (
    <div className="full-screen" style={{ overflow: "hidden" }}>
      <Webcam
        audio={false}
        ref={webcamRef}
        width={window.innerWidth}
        height={window.innerHeight}
        screenshotFormat="image/jpeg"
        videoConstraints={{ ...videoConstraints, facingMode: facingMode }}
        minScreenshotHeight={window.innerHeight * 2}
        minScreenshotWidth={window.innerWidth * 2}
        mirrored={mirrored}
        // screenshotQuality={1}
      />
      <div onClick={capture} className="camera-btn"></div>
      <div className="camera-guide-line"></div>
      <div
        className="camera-rotate"
        onClick={() => {
          console.log("asas");
          setFacingMode((p) => {
            console.log(p);
            if (p === "user") {
              setMirrored(false);
              return { exact: "environment" };
            } else {
              setMirrored(true);
              return "user";
            }
          });
        }}
      >
        <FontAwesomeIcon icon={faRotate} />
      </div>
    </div>
  );
}
const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return { facingMode: { exact: "environment" }, mirror: false };
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return { facingMode: { exact: "environment" }, mirror: false };
  }
  return { facingMode: "user", mirror: true };
};
