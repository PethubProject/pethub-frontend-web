import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import "./camera.css";
import { isEmpty } from "../../components/Utils/Utils";
export default function Camera() {
  const webcamRef = useRef();
  const controllerRef = useRef();
  const cameraRef = useRef();
  const [facingMode, setFacingMode] = useState(getDeviceType().facingMode);
  const [mirrored, setMirrored] = useState(getDeviceType().mirror);
  const [loading, setLoading] = useState(true);
  const videoConstraints = {
    width: { ideal: window.innerHeight * 3 },
    height: { ideal: window.innerWidth * 3 },
  };
  const navigate = useNavigate();
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    var file = base64toFile(imageSrc, "capture.png");
    var formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://121.161.138.149:8080/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((resp) => {
        navigate("/ai/result", {
          state: { imageSrc: imageSrc, data: resp.data },
        });
      })
  }, [webcamRef]);

  useEffect(() => {
    webcamRef.current.video.addEventListener("loadedmetadata", () => {
      setLoading(false);
    });
  }, [webcamRef, mirrored]);

  useEffect(() => {
    // const { clientWidth, clientHeight } = webcamRef.current.video;
    // console.log(clientWidth, clientHeight, webcamRef.current.video);
    const resize = (e) => {
      const { clientHeight } = e.target;
      controllerRef.current.style.top = +clientHeight - 48 + "px";
    };
    if (!isEmpty(webcamRef.current)) {
      webcamRef.current.video.addEventListener("resize", resize);
    }
    return () => {
      if (!isEmpty(webcamRef.current)) {
        webcamRef.current.video.removeEventListener("resize", resize);
      }
    };
  }, [webcamRef]);

  return (
    <div id="main">
      <div className="content">
        <div id="camera" className={loading ? "camera-hide" : "camera-show"} ref={cameraRef}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ ...videoConstraints, facingMode: facingMode }}
            minScreenshotHeight={window.innerHeight * 2}
            minScreenshotWidth={window.innerWidth * 2}
            mirrored={mirrored}
          />
          <div className="camera-control" ref={controllerRef}>
            <div className="camera-file">
              <FontAwesomeIcon icon={faImage} />
            </div>
            <div onClick={capture} className="camera-btn"></div>
            <div
              className="camera-rotate"
              onClick={() => {
                setFacingMode((p) => {
                  if (p === "user") {
                    setMirrored(false);
                    setLoading(true);
                    return { exact: "environment" };
                  } else {
                    setLoading(true);
                    setMirrored(true);
                    return "user";
                  }
                });
              }}
            >
              <FontAwesomeIcon icon={faRotate} />
            </div>
          </div>
          <div className="camera-guide-line"></div>
        </div>
      </div>
    </div>
  );
}
const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return { facingMode: { exact: "environment" }, mirror: false };
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return { facingMode: { exact: "environment" }, mirror: false };
  }
  return { facingMode: "user", mirror: true };
};

function base64toFile(base_data, filename) {
  var arr = base_data.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
