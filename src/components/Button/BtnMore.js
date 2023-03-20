import "./button.css";
export default function BtnMore({ onClick }) {
  return (
    <button
      className="btn btn-more"
      onClick={(e) => {
        onClick(e);
      }}
    >
      더보기
    </button>
  );
}
