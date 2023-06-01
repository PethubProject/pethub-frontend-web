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
        <div> 내정보</div>
      </div>
      <div
        className="list-item v-exp"
        onClick={() => {
          navigate("/freeboard");
        }}
      >
        <div>자유게시판</div>
      </div>
      <div
        className="list-item v-exp"
        onClick={() => {
          navigate("/counselboard");
        }}
      >
        <div>상담게시판</div>
      </div>
      <UserWrapper isUser={<SignOut />} />
    </div>
  );
}
