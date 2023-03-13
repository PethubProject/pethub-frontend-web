import "./modal.css";
export default function CenterModal({ children }) {
  return (
    <div id="modal-wrap">
      <div id="modal">{children}</div>
    </div>
  );
}
