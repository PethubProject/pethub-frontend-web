import "./button.css";
export default function BtnRegister({ onClick = () => {}, text = "등록" }) {
  return (
    <button
      className="btn btn-register"
      onClick={(e) => {
        onClick(e);
      }}
    >
      {text}
    </button>
  );
}
