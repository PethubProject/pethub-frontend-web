import { useNavigate } from "react-router-dom";
import "./list.css";
export default function VetList({ list }) {
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
          
          <div className="vet-list-item" key={Math.random()} onClick={() => {
            nav(`/counselboard/content?contentId=${d.postId}`);
            // back api?
          }}>
            <div className="vet-list-img">
              <img src={d.profile_image} alt="수의사 사진" />
            </div>
            <div className="vet-list-info">
              <div className="vet-list-name">{d.name}</div>
              <div className="vet-list-address">{d.address}</div>
              <div className="vet-list-score">{d.score}</div>
              <div className="vet-list-time">{d.time}</div>
              
            </div>
          </div>
        );
      })}
    </>
  );
}
