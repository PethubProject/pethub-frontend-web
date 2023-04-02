import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function BtnWriteGoBack() {
  const nav = useNavigate();

  const handleGoBack = () => {
    const confirmed = window.confirm("현재 내용이 저장되지 않습니다. 정말 뒤로 가시겠습니까?");
    if (confirmed) {
      nav(-1);
    }
  }

  return (
    <div className="btn" onClick={handleGoBack}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </div>
  );
}
