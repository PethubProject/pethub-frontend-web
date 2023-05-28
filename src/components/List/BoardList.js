import { useNavigate } from "react-router-dom";
import { forwardRef } from "react";
import "./list.css";
export default forwardRef(function BoardList({ list, totalCnt }, ref) {
  return (
    <div className="list-col" ref={ref}>
      <DrawList items={list} totalCnt={totalCnt}></DrawList>
    </div>
  );
});

function DrawList({ items, totalCnt }) {
  const nav = useNavigate();
  console.log(totalCnt);
  return (
    <>
      {items.map((d, i) => {
        return (
          <div
            className="list-item"
            key={Math.random()}
            onClick={() => {
              nav(`/freeboard/content?contentId=${d.postId}`);
            }}
          >
            <div className="list-title">
              <span style={{ display: "none" }}>{totalCnt - i}</span>
              {d.postTitle}
            </div>
            <div className="list-reg-user">{d.user.nickname}</div>
            <div className="list-reg-dt">
              {new Date(d.createdAt).format("yyyy-MM-dd HH:mm:ss")}
            </div>
          </div>
        );
      })}
    </>
  );
}
