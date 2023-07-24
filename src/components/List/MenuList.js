import { useNavigate } from "react-router-dom";
import SignOut from "../../pages/Sign/SignOut";
import { useRecoilValue } from "recoil";
import { UserState } from "../../state/User";
import UserWrapper from "../Wrapper/UserWrapper";
import { validUserRole } from "../../common/Validation";

export default function MenuList() {
  const navigate = useNavigate();
  const user = useRecoilValue(UserState);
  return (
    <div className="list-col">
      <UserWrapper
        isUser={
          <>
            <div
              className="list-item v-exp"
              onClick={() => {
                navigate(
                  "/userinfo"
                  // validUserRole(user, {
                  //   owner: (_) => "/userinfo",
                  //   vet: (_) => "/vetinfo",
                  // })
                );
              }}
            >
              <div>내 정보</div>
            </div>
            {
             user.role==="VET"&&
             <div
              className="list-item v-exp"
              onClick={() => {
                navigate(
                  "/vetinfo"
             
                );
              }}
            >
              <div>수의사 정보</div>
            </div>
            }
          </>
        }
      />
      {/* <div
        className="list-item v-exp"
        onClick={() => {
          navigate("/freeboard");
        }}
      >
        <div>자유게시판</div>
      </div> */}
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
