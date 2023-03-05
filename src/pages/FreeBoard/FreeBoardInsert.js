import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BoardHeader from "../../components/Haeder/BoardHeader";
import BottomTabNavigation from "../../components/Navigation/BottomTabNavigation";

export default function FreeBoardInsert() {
  const [searchParams, setSearchParams] = useSearchParams();
  const nav = useNavigate();

  return (
    <div>
      <BoardHeader
        title="자유게시판 글 등록"
        right={
          <div className="btn-wrapper">
            {/* <button className="btn">임시저장</button> */}
            <button className="btn">등록</button>
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
