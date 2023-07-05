import "./button.css";
export default function BtnRegister({ onClick, children }) {
  return (
    <button
      className="btn btn-update"
      onClick={(e) => {
        onClick(e);
      }}
    >
      {children ? children : "수정"}
    </button>
  );
}
