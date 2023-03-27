import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import lists from "../../dummy/Lists.js";

function CounselContent() {
  const nav = useNavigate();
  const [searchparams, setsearchparams] = useSearchParams();
  const list = lists.find(
    (list) => list.id === parseInt(searchparams.get("contentID"))
  ); //ConselList에서 14번째 줄과 변수명 동일하게 하기

  if (!list) {
    return <h2>해당 게시물은 존재하지 않거나 삭제된 게시물입니다.</h2>;
  }

  return (
    <div>
      <h2>{list.title}</h2>
      <div>{list.content}</div>
      <div>작성자: {list.user}</div>
      <div>작성일: {list.createdtime}</div>
      <div
        key={list.id}
        className="update_btn"
        onClick={() => nav(`/counselboard/update?contentID=${list.id}`)}
      >
        <span>글 수정하기</span>
      </div>
    </div>
  );
}

export default CounselContent;
