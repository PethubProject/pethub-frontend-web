import { useRef, useEffect } from "react";

export default function Camera() {
  const videoRef = useRef(null);
  const constraints = { video: { width: 1280, height: 720, mirror: true } };
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
    getMedia(constraints);
  }, []);
  return (
    <div>
      <video ref={videoRef} autoPlay />
    </div>
  );
}
