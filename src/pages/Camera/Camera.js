import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import "./camera.css";
import { loading } from "../../components/Utils/Loading";
import { useScaleChange } from "../../common/hooks";

export default function Camera() {
  const location = useLocation();
  const webcamRef = useRef();
  const controllerRef = useRef();
  const imgRangeRef = useRef();
  const cameraRef = useRef();
  const { scale, setScale } = useScaleChange({ zoomWeight: 0.1, maxZoom: 8, minZoom: 1 });
  const [facingMode, setFacingMode] = useState(getDeviceType().facingMode);
  const [mirrored, setMirrored] = useState(getDeviceType().mirror);
  const [videoLoading, setVideoLoading] = useState(true);

  const videoConstraints = {
    width: { ideal: window.innerHeight * 3 },
    height: { ideal: window.innerWidth * 3 },
    zoom: true,
    // width: 1920,
    // height: 1080,
    // aspectRatio: { exact: 1.7777777778 },
    // resizeMode: "crop-and-scale",
  };

  const navigate = useNavigate();
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    var file = base64toFile(imageSrc, "capture.png");
    var formData = new FormData();
    formData.append("file", file);
    loading.on();
    axios
      .post(process.env.REACT_APP_AI_API_URL + "/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((resp) => {
        navigate("/ai/result", {
          state: { imageSrc: imageSrc, data: resp.data },
          replace: true,
        });
      })
      .finally(() => {
        loading.off();
      });
  }, [webcamRef]);

  useEffect(() => {
    const loadedmetadata = (e) => {
      setVideoLoading(false);
      const stream = webcamRef.current.stream;
      if (stream) {
        const [videoTrack] = stream.getVideoTracks();
        const capabilities = videoTrack.getCapabilities();

        if (capabilities.zoom) {
          imgRangeRef.current.style.display = "block";
          imgRangeRef.current.min = capabilities.zoom?.min || 1;
          imgRangeRef.current.max = capabilities.zoom?.max || 8;
          imgRangeRef.current.step = capabilities.zoom?.step || 0.1;
        }
      }
    };
    webcamRef.current.video.addEventListener("loadedmetadata", loadedmetadata);
  }, [webcamRef, mirrored, imgRangeRef]);

  useEffect(() => {
    if (mirrored || !webcamRef) return;
    const stream = webcamRef.current.stream;
    if (stream) {
      const [videoTrack] = stream.getVideoTracks();
      const capabilities = videoTrack.getCapabilities();
      if (capabilities.zoom) {
        imgRangeRef.current.style.display = "block";
        videoTrack.applyConstraints({ advanced: [{ zoom: parseInt(scale > 8 ? 8 : scale) + capabilities.zoom.step, focusDistance: 1 }] });
      }
    }
  }, [webcamRef, mirrored, scale, imgRangeRef]);

  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: "camera" }).then((res) => {
        if (res.state === "granted") {
        } else if (res.state === "prompt") {
        } else {
          alert("카메라 권한이 없습니다");
          navigate(-1);
          return;
        }
      });
    } else if (!location.state?.cordova) {
      alert("카메라 권한이 없습니다");
      navigate(-1);
      return;
    }
  }, []);
  return (
    <div id="main">
      <div className="content">
        <div id="camera" ref={cameraRef} className={videoLoading ? "camera-hide" : "camera-show "}>
          <Webcam
            id={"video"}
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ ...videoConstraints, facingMode: facingMode }}
            minScreenshotHeight={window.innerHeight * 2}
            minScreenshotWidth={window.innerWidth * 2}
            mirrored={mirrored}
            className={videoLoading ? "camera-hide" : "camera-show "}
          />
          <div className="camera-control" ref={controllerRef}>
            <div>
              <input
                type="range"
                ref={imgRangeRef}
                value={scale}
                onInput={(e) => {
                  setScale(Number(e.target.value));
                }}
                style={{ display: "none" }}
              />
            </div>
            <div>
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
                      setVideoLoading(true);

                      return { exact: "environment" };
                    } else {
                      setVideoLoading(true);
                      setMirrored(true);
                      return "user";
                    }
                  });
                }}
              >
                <FontAwesomeIcon icon={faRotate} />
              </div>
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
