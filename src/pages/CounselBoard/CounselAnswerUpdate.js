import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AnswerLists from "../../dummy/AnswerLists";
import BoardHeader from "../../components/Header/HeaderBoard.js";

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
    <div id="main">
      <div id="counsel_header">
        <BoardHeader />
      </div>
      <div id="counsel_content">
        <div id="answer_update_title">
          <h2>답변 수정 페이지</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            <div className="label_update_title">
              제목:
              <input
                type="text"
                value={title}
                placeholder="제목을 수정하시오"
                onChange={handleTitleChange}
              />
            </div>
          </label>

          <label>
            <div className="label_update_content">
              답변 내용:
              <textarea
                value={content}
                placeholder="내용을 수정하시오"
                onChange={handleContentChange}
              />
            </div>
          </label>

          <div className="board_update_btn">
            <button
              type="submit"
              onClick={() => {
                nav(`/counselboard/content?contentID=${AnswerList.id}/`);
              }}
            >
              수정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CounselAnswerUpdate;
