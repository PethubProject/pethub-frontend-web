import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BtnGoBack from "../../components/Button/BtnGoBack.js";
import lists from "../../dummy/Lists.js";
import AnswerLists from "../../dummy/AnswerLists.js";

function CounselContent() {
  const nav = useNavigate();
  const [searchparams, setsearchparams] = useSearchParams();
  const list = lists.find(
    (list) => list.id === parseInt(searchparams.get("contentID"))
  ); //ConselList에서 14번째 줄과 변수명 동일하게 하기

  const answerlist = AnswerLists.find(
    (answerlist) => answerlist.id === parseInt(searchparams.get("contentID"))
  );

  if (!list) {
    return <h2>해당 게시물은 존재하지 않거나 삭제된 게시물입니다.</h2>;
  }

  if (!answerlist) {
    return <h2>해당 답변은 존재하지 않거나 삭제된 게시물입니다.</h2>;
  }

  return (
    <div>
      <div>
        <BtnGoBack></BtnGoBack>
      </div>
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
      <div
        key={list.id}
        className="update_btn"
        onClick={() => nav(`/counselboard/answer/insert?contentID=${list.id}`)}
      >
        <span>답변 달기</span>
      </div>

      {/* 답변 */}
      <div>
        <h2>{answerlist.title}</h2>
        <div>{answerlist.content}</div>
        <div>작성자: {answerlist.user}</div>
        <div>작성일: {answerlist.createdtime}</div>
        <div
          key={list.id}
          className="update_btn"
          onClick={() =>
            nav(`/counselboard/answer/update?contentID=${answerlist.id}`)
          }
        >
          답변수정하기
        </div>
      </div>
    </div>
  );
}

export default CounselContent;
