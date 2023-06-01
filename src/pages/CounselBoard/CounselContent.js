import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import lists from "../../dummy/Lists.js";
import AnswerLists from "../../dummy/AnswerLists.js";
import BoardHeader from "../../components/Header/HeaderBoard.js";
import "../FreeBoard/FreeBoard.css";
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
    <div id="main">
      <div id="counsel_header">
        <BoardHeader />
      </div>
      <div id="board-info">
        <div className="info-title">{list.title}</div>
        <div className="info-reg">
          <div className="info-reg-user">
            <div>작성자: {list.user}</div>
          </div>
          <div className="info-reg-dt">
            <div>작성일: {list.createdtime}</div>
          </div>
        </div>

        {/* <div className="board-info">
          <div
            key={list.id}
            className="update_btn"
            onClick={() => nav(`/counselboard/update?contentID=${list.id}`)}
          >
            <span>글 수정하기</span>
          </div>
        </div> */}
        {/* <div>
          <div
            key={list.id}
            className="update_btn"
            onClick={() =>
              nav(`/counselboard/answer/insert?contentID=${list.id}`)
            }
          >
            <span>답변 달기</span>
          </div>
        </div> */}
        {/* 답변 */}
        {/* <div className="box">
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
        </div> */}
      </div>
      <div id="board-desc">{list.content}</div>
    </div>
  );
}

export default CounselContent;
