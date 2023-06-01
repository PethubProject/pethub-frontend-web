import { useNavigate } from "react-router-dom";
import { forwardRef } from "react";
import "./FreeBoard.css";
import { dateToDiffStr } from "../../utils/DateTime";
export default forwardRef(function BoardList({ list, totalCnt }, ref) {
  return (
    <div className="board-list-col" ref={ref}>
      <DrawList items={list} totalCnt={totalCnt}></DrawList>
    </div>
  );
});

function DrawList({ items, totalCnt }) {
  const nav = useNavigate();
  return (
    <>
      {items.map((d, i) => {
        console.log(d);
        return (
          <div
            className="board-list-item"
            key={Math.random()}
            onClick={() => {
              nav(`/freeboard/content?contentId=${d.postId}`);
            }}
          >
            <div className="board-list-title">
              <span style={{ display: "none" }}>{totalCnt - i}</span>
              {d.title}
            </div>
            <div className="board-list-content">{d.content}</div>
            <div className="board-list-reg">
              <div className="board-list-reg-user">{d.user.nickname}</div>
              <div className="board-list-reg-dt">
                {dateToDiffStr(new Date(), new Date(d.createdAt))}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
