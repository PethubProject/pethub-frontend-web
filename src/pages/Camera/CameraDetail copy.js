import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./camera.css";
export default function CameraDetail() {
  const location = useLocation();
  console.log(location.state.imageSrc);
  const canvas = useRef();
  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = window.innerWidth;
    canvas.current.height = window.innerHeight;
    var image = new Image();
    image.src = location.state.imageSrc;
    image.onload = function () {
      // drawImageScaled(image, ctx);
      // console.log(image.width, image.height);
      // console.log(canvas.current.height);
      ctx.drawImage(image, 0, 0, image.width, image.height);
    };
  }, []);

  function drawImageScaled(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.min(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  return (
    <div>
      <canvas ref={canvas} style={{ display: "none" }}></canvas>
      <div id="camera-shot">
        <img src={location.state.imageSrc} alt="사진 결과" />
      </div>
      <textarea defaultValue={location.state.imageSrc}></textarea>
      <button
        onClick={() => {
          const a = document.createElement("a");

          a.href = location.state.imageSrc;
          a.download = "test.jpg";
          a.click();
        }}
      >
        다운로드
      </button>
    </div>
  );
}
