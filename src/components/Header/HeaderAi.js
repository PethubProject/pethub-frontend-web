import { useLocation, useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import logo from "../../resources/image/logo.png";
import BtnDownload from "../Button/BtnDownload";
export default function HeaderAi() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header>
      <div
        className="img-wrap"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={logo} alt="logo" />
      </div>
      <div>AI 진단 결과</div>
      <div>
        <BtnDownload
          onClick={() => {
            const a = document.createElement("a");
            a.href = location.state.imageSrc;
            a.download = `${uuid().replace(
              /-/,
              ""
            )}_${new Date().toISOString()}.jpeg`;
            a.click();
          }}
        />
      </div>
    </header>
  );
}
