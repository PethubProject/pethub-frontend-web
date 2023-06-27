import { useNavigate } from "react-router-dom";
import { forwardRef } from "react";
import { dateToDiffStr } from "../../utils/DateTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
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
        return (
          <div
            className="board-list-item"
            key={Math.random()}
            onClick={() => {
              nav(`/counselboard/content?contentId=${d.postId}`);
            }}
          >
            <div className="board-list-title">
              <span style={{ display: "none" }}>{totalCnt - i}</span>
              {d.title}
            </div>
            <div className="board-list-content">{d.content}</div>
            <div className="board-list-reg">
              <div className="board-list-reg-user">{d.ownerInfo.nickname}</div>
              <div className="board-list-reg-dt">
                {dateToDiffStr(new Date(), new Date(d.createdAt))}
              </div>
              <div className="borad-list-comment-cnt">
                <FontAwesomeIcon icon={faCommentDots} />
                <span>{d.commentList.length}</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
