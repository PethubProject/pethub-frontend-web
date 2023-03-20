import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./button.css";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
export default function BtnDownload({ onClick }) {
  return (
    <button
      className="btn btn-download"
      onClick={(e) => {
        onClick(e);
      }}
    >
      <FontAwesomeIcon icon={faDownload} />
    </button>
  );
}
