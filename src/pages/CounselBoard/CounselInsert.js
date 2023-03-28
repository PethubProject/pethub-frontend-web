import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import lists from "../../dummy/Lists.js";

//리스트에 올라가야함
//제목, 내용, 유저이름, 시간을 받아야함.

function CounselInsert() {
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

    const id = lists.length + 1;
    const createdtime = new Date().toISOString();
    const newContent = {
      id,
      title,
      content,
      user,
      createdtime,
    };
    lists.push(newContent);
    nav(`/counselboard/content?contentID=${lists.id}`);
  };

  return (
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
      <label>
        작성자:
        <input type="text" value={user} onChange={handleUserChange} />
      </label>
      <br />
      <button
        type="submit"
        className="insert_btn"
        onClick={() => {
          nav(`/counselboard/`);
        }}
      >
        등록
      </button>
    </form>
  );
}

export default CounselInsert;
