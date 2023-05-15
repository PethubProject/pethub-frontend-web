import React from "react";
import { useNavigate } from "react-router-dom";
import BtnFloat from "../../components/Button/BtnFloat.js";
import BoardHeader from "../../components/Header/HeaderBoard.js";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom.js";
import lists from "../../dummy/Lists.js";
import "./Counsel.css"
function CounselList() {
  const nav = useNavigate();

  return (
    <div id="main">
      <BoardHeader title="상담게시판" />
      <div id="counsel-board" className="content flex-column">
        <div className="content scroll-hide board-list">
          <div className="list-col">
            {lists.map((list) => (
              <div
                key={list.id}
                className="list-item"
                onClick={() => {
                  nav(`/counselboard/content?contentID=${list.id}`);
                }}
              >
                <div className="list-title">{list.title}</div>
                <div className="list_content" style={{ width: "100%" }}>
                  {list.content.slice(0, 14) + "..."}
                </div>
                <div style={{ display: "flex", width: "100%" }}>
                  <div className="list-reg-user">작성자: {list.user}</div>
                  <div className="list-reg-dt">작성일: {list.createdtime}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div>
        <BtnInsert></BtnInsert>
      </div> */}
      <BottomTabNavigation />
      <BtnFloat
        onClick={() => {
          nav("/counselboard/insert");
        }}
      />
    </div>
  );
}

export default CounselList;
