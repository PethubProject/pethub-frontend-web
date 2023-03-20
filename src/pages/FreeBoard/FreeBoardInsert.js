import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BoardHeader from "../../components/Header/HeaderBoard";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";
import BtnRegister from "../../components/Button/BtnRegister";

export default function FreeBoardInsert() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <div id="main">
      <BoardHeader
        title="자유게시판 글 등록"
        right={
          <div className="btn-wrapper">
            {/* <button className="btn">임시저장</button> */}
            <BtnRegister
              onClick={() => {
                navigate("/freeboard");
              }}
            />
          </div>
        }
      />

      <form>
        <div className="form-item">
          <input
            className="form-item-input"
            type="text"
            placeholder="제목입력"
          />
        </div>
        <div className="form-item">
          <textarea
            className="form-item-textarea"
            placeholder="내용입력"
          ></textarea>
        </div>
      </form>
      {/* <BottomTabNavigation /> */}
    </div>
  );
}
