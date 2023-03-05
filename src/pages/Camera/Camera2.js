import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  async function getMedia(constraints) {
    let stream = null;

    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
    } catch (err) {
      /* 오류 처리 */
    }
  }
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
    ctx.translate(canvasRef.current.width, 0);
    ctx.scale(-1, 1);
    constraints.video.width = window.innerWidth;
    constraints.video.height = window.innerHeight;
    getMedia(constraints);
    setInterval(() => {
      ctx.drawImage(
        videoRef.current,
        0,
        0,
        // window.innerWidth,
        // window.innerHeight
        videoRef.current ? videoRef.current.videoWidth : window.innerWidth,
        videoRef.current ? videoRef.current.videoWidth : window.innerWidth
      );
    }, 0);
  }, []);
  return (
    <div className="full-screen">
      <video autoPlay ref={videoRef}></video>
      <canvas ref={canvasRef}></canvas>
      <div
        onClick={() => {
          console.log();
          const a = document.createElement("a");
          a.href = canvasRef.current.toDataURL("image/jpeg");
          a.download = "test.jpeg";
          a.click();
          navigate("/camera/detail", {
            state: { imageSrc: canvasRef.current.toDataURL("image/jpeg") },
          });
        }}
        className="camera-btn"
      ></div>
    </div>
  );
}

const constraints = {
  video: { facingMode: "user", width: 10000, height: 10000 },
};
