import "./wrapper.css";
export default function ImgWrapper({
  src = "",
  alt = "",
  width = "24px",
  height = "24px",
  borderRadius = "0",
  className = "",
}) {
  return (
    <div
      className={"img-wrapper " + className}
      style={{
        width: width,
        height: height,
        borderRadius: borderRadius,
      }}
    >
      <img src={src} alt={alt} />
    </div>
  );
}
