import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BottomTabNavigation from "../../components/Navigation/BottomTabNavigation";
import BoardHeader from "../../components/Haeder/BoardHeader";
import { dummyFreeBoardContent } from "../../api/dummy";

export default function FreeBoardUpdate() {
  const [searchParams, setSearchParams] = useSearchParams();
  const nav = useNavigate();
  const [content, setContent] = useState({
    title: "",
    desc: "",
  });
  useEffect(() => {
    const item = dummyFreeBoardContent.filter(
      (d) => d.contentId === Number(searchParams.get("contentId"))
    );
    if (item.length > 0) {
      setContent(item[0]);
    }
  }, []);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setContent((p) => ({ ...p, [name]: value }));
  };
  return (
    <div>
      <BoardHeader
        title="자유게시판 글 수정"
        right={
          <div className="btn-wrapper">
            {/* <button className="btn">임시저장</button> */}
            <button className="btn" onClick={() => nav("/freeboard")}>
              등록
            </button>
          </div>
        }
      />
      <form>
        <div className="form-item">
          <input
            className="form-item-input"
            type="text"
            name="title"
            onChange={onChangeHandler}
            value={content.title}
            placeholder="제목입력"
          />
        </div>
        <div className="form-item">
          <textarea
            className="form-item-textarea"
            name="desc"
            onChange={onChangeHandler}
            value={content.desc}
            placeholder="내용입력"
          ></textarea>
        </div>
      </form>
      {/* <BottomTabNavigation /> */}
    </div>
  );
}
