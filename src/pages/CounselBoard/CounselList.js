import React from "react";
import { useNavigate } from "react-router-dom";
import BtnGoBack from "../../components/Button/BtnGoBack.js";
import BtnInsert from "../../components/Button/BtnInsert.js";
import lists from "../../dummy/Lists.js";

function CounselList() {
  const nav = useNavigate();

  return (
    <div>
      <div>
        <BtnGoBack></BtnGoBack>
      </div>
      <title>상담게시판</title>
      {lists.map((list) => (
        <div
          key={list.id}
          onClick={() => {
            nav(`/counselboard/content?contentID=${list.id}`);
          }}
        >
          <hr></hr>
          <div className="list_title">{list.title}</div>
          <div className="list_content">
            {list.content.slice(0, 14) + "..."}
          </div>
          <div className="list_user">작성자: {list.user}</div>
          <div className="list_time">작성일: {list.createdtime}</div>
          <hr></hr>
        </div>
      ))}
      <div>
        <BtnInsert></BtnInsert>
      </div>
    </div>
  );
}

export default CounselList;
