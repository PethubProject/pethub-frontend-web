import "./button.css";
export default function BtnRegister({ onClick }) {
  return (
    <button
      className="btn btn-delete"
      onClick={(e) => {
        onClick(e);
      }}
    >
      삭제
    </button>
  );
}
