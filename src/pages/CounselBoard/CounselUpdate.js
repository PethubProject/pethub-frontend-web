import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import lists from "../../dummy/Lists.js";

function CounselContent() {
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
    console.log(`제목: ${title}, 내용: ${content}`);
  };

  return (
    <div>
      <h2>게시글 수정</h2>
      <form onSubmit={handleSubmit}>
        <label>
          제목:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <label>
          내용:
          <textarea value={content} onChange={handleContentChange} />
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

export default CounselContent;
