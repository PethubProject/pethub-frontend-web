import "./button.css";
export default function BtnRegister({ onClick }) {
  return (
    <button
      className="btn btn-update"
      onClick={(e) => {
        onClick(e);
      }}
    >
      수정
    </button>
  );
}
