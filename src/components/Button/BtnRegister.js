import "./button.css";
export default function BtnRegister({ onClick }) {
  return (
    <button
      className="btn btn-register"
      onClick={(e) => {
        onClick(e);
      }}
    >
      등록
    </button>
  );
}
