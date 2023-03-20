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
              nav(`/freeboard/content?contentId=${d.contentId}`);
            }}
          >
            <div className="list-title">{d.title}</div>
            <div className="list-reg-user">{d.regUser}</div>
            <div className="list-reg-dt">{d.regDt}</div>
          </div>
        );
      })}
    </>
  );
}
