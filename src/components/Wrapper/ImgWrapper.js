import React, { useCallback } from "react";
import "./wrapper.css";
function ImgWrapper({
  src = "",
  alt = "",
  width = "24px",
  height = "24px",
  borderRadius = "0",
  className = "",
  defaultImg = "",
}) {
  const handleImgError = useCallback((e) => {
    e.target.src = defaultImg;
  });
  return (
    <div
      className={"img-wrapper " + className}
      style={{
        width: width,
        height: height,
        borderRadius: borderRadius,
      }}
    >
      <img src={src} alt={alt} onError={handleImgError} />
    </div>
  );
}

export default ImgWrapper;
