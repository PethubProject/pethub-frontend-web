import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import lists from "../../dummy/Lists.js";
import BtnWriteGoBack from "../../components/Button/BtnWriteGoBack.js";

function CounselUpdate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const nav = useNavigate();
  const [searchparams, setsearchparams] = useSearchParams();
  const list = lists.find(
    (list) => list.id === parseInt(searchparams.get("contentID"))
  ); //ConselList에서 14번째 줄과 변수명 동일하게 하기

  if (!list) {
    return <h2>해당 게시물은 존재하지 않거나 삭제된 게시물입니다.</h2>;
  }
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div>
        <BtnWriteGoBack></BtnWriteGoBack>
      </div>
      <h2>게시글 수정</h2>
      <form onSubmit={handleSubmit}>
        <label>
          제목:
          <input
          className="title_text"
            type="text"
            value={title}
            placeholder="제목을 수정하시오"
            onChange={handleTitleChange}
          />
        </label>
        <br />
        <label>
          내용:
          <textarea
          className="textarea_content"
            value={content}
            placeholder="내용을 수정하시오"
            onChange={handleContentChange}
          />
        </label>
        <br />
        <button
          type="submit"
          onClick={() => {
            nav(`/counselboard/content?contentID=${list.id}/`);
          }}
        >
          수정
        </button>
      </form>
    </div>
  );
}

export default CounselUpdate;
