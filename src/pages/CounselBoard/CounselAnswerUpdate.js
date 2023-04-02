import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AnswerLists from "../../dummy/AnswerLists";
import BtnWriteGoBack from "../../components/Button/BtnWriteGoBack";

function CounselAnswerUpdate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const nav = useNavigate();
  const [searchparams, setsearchparams] = useSearchParams();
  const AnswerList = AnswerLists.find(
    (AnswerList) => AnswerList.id === parseInt(searchparams.get("contentID"))
  ); 

  //

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
      <h2>답변 수정 페이지</h2>
      <form onSubmit={handleSubmit}>
        <label>
          제목:
          <input
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
            value={content}
            placeholder="내용을 수정하시오"
            onChange={handleContentChange}
          />
        </label>
        <br />
        <button
          type="submit"
          onClick={() => {
            nav(`/counselboard/content?contentID=${AnswerList.id}/`);
          }}
        >
          수정
        </button>
      </form>
    </div>
  );
}

export default CounselAnswerUpdate;
