import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnswerLists from "../../dummy/AnswerLists.js";
import BoardHeader from "../../components/Header/HeaderBoard.js";

//리스트에 올라가야함
//제목, 내용, 유저이름, 시간을 받아야함.

function CounselAnswerInsert() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState("");
  const nav = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const id = AnswerLists.length + 1;
    const createdtime = new Date().toISOString();
    const newContent = {
      id,
      title,
      content,
      user,
      createdtime,
    };
    AnswerLists.push(newContent);
    nav(`/counselboard/content?contentID=${AnswerLists.id}`);
  };

  return (
    <div id="main">
      <BoardHeader />

      <div id="counsel_content">
        <div id="insert_title">
          <h2>답변 작성페이지</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            <div className="insert_title">
              작성자:
              <input
                className="user"
                type="text"
                value={user}
                onChange={handleUserChange}
              />
            </div>
          </label>

          <label>
            <div className="insert_title">
              제목:
              <input type="text" value={title} onChange={handleTitleChange} />
            </div>
          </label>

          <label>
            <div className="insert_content">
              내용:
              <textarea value={content} onChange={handleContentChange} />
            </div>
          </label>

          <div className="board_update_btn">
            <button
              type="submit"
              className="insert_btn"
              onClick={() => {
                nav(`/counselboard/`);
              }}
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CounselAnswerInsert;
