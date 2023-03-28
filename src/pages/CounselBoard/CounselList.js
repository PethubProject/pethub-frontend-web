import React from "react";
import { useNavigate } from "react-router-dom";
import lists from "../../dummy/Lists.js";

function CounselList() {
  const nav = useNavigate();
  return (
    <div>
      <title>상담게시판</title>
      {lists.map((list) => (
        <div
          key={list.id}
          onClick={() => {
            nav( `/counselboard/content?contentID=${list.id}`);
          }}
        >
          <hr></hr>
          <div className="list_title">{list.title}</div>
          <div className="list_content">{list.content}</div>
          <div className="list_user">작성자: {list.user}</div>
          <div className="list_time">작성일: {list.createdtime}</div>
          <hr></hr>
        </div>
      ))}
      <div
      className="insert_btn"
      onClick={()=> nav(`/counselboard/Insert`)}
      >
        <span>글 등록</span>
      </div>
    </div>
  );
}

export default CounselList;
