import React from "react";
import { useNavigate } from "react-router-dom";
import BtnFloat from "../../components/Button/BtnFloat.js";
import BoardHeader from "../../components/Header/HeaderBoard.js";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom.js";
import lists from "../../dummy/Lists.js";
import "../FreeBoard/FreeBoard.css";
import { dateToDiffStr } from "../../utils/DateTime.js";
function CounselList() {
  const nav = useNavigate();

  return (
    <div id="main">
      <BoardHeader title="상담게시판" />
      <div id="counsel-board" className="content flex-column">
        <div className="content scroll-hide board-list">
          <div className="board-list-col">
            {lists.map((list) => (
              <div
                key={list.id}
                className="board-list-item"
                onClick={() => {
                  nav(`/counselboard/content?contentID=${list.id}`);
                }}
              >
                <div className="board-list-title">{list.title}</div>
                <div className="board-list-content">
                  {list.content +
                    list.content +
                    list.content +
                    list.content +
                    list.content +
                    list.content +
                    list.content +
                    list.content +
                    list.content +
                    list.content}
                </div>
                <div className="board-list-reg">
                  <div className="board-list-reg-user">{list.user}</div>
                  <div className="board-list-reg-dt">
                    {dateToDiffStr(new Date(), new Date(list.createdtime))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <BtnFloat
          onClick={() => {
            nav("/counselboard/insert");
          }}
        />
      </div>
      {/* <div>
        <BtnInsert></BtnInsert>
      </div> */}
      <BottomTabNavigation />
    </div>
  );
}

export default CounselList;
