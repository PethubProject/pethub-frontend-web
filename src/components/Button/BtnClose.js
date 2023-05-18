import "./button.css";
export default function BtnClose({ onClick = () => {}, text = "닫기" }) {
  return (
    <button className="btn btn-close" onClick={onClick}>
      {text}
    </button>
  );
}
