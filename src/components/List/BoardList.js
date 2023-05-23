import { useNavigate } from "react-router-dom";
import "./list.css";
export default function BoardList({ list }) {
  return (
    <div className="list-col">
      <DrawList items={list}></DrawList>
    </div>
  );
}

function DrawList({ items }) {
  const nav = useNavigate();
  return (
    <>
      {items.map((d) => {
        return (
          <div
            className="list-item"
            key={Math.random()}
            onClick={() => {
              nav(`/freeboard/content?contentId=${d.postId}`);
            }}
          >
            <div className="list-title">{d.postTitle}</div>
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
