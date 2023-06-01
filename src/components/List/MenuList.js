import { useNavigate } from "react-router-dom";
import SignOut from "../../pages/Sign/SignOut";
import UserWrapper from "../Wrapper/UserWrapper";

export default function MenuList() {
  const navigate = useNavigate();

  return (
    <div className="list-col">
      <div
        className="list-item v-exp"
        onClick={() => {
          navigate("/userinfo");
        }}
      >
        내정보
      </div>
      <div
        className="list-item v-exp"
        onClick={() => {
          navigate("/freeboard");
        }}
      >
        자유게시판
      </div>
      <div
        className="list-item v-exp"
        onClick={() => {
          navigate("/counselboard");
        }}
      >
        상담게시판
      </div>
      <UserWrapper isUser={<SignOut />} />
    </div>
  );
}
