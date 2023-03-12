import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BoardHeader from "../../components/Header/HeaderBoard";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";
import { dummyFreeBoardContent, dummyFreeBoardReply } from "../../api/dummy";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import EllipsisVertical from "../../components/Button/EllipsisVertical";

export default function FreeBoardContent() {
  const [modal, setModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [content, setContent] = useState({
    title: "",
    contentId: null,
    desc: "",
  });
  const [reply, setReply] = useState([]);
  useEffect(() => {
    const item = dummyFreeBoardContent.filter(
      (d) => d.contentId === Number(searchParams.get("contentId"))
    );
    if (item.length > 0) {
      setContent(item[0]);
    }
    setReply(
      dummyFreeBoardReply.filter(
        (d) => d.contentId === Number(searchParams.get("contentId"))
      )
    );
  }, []);
  const nav = useNavigate();
  return (
    <div>
      <BoardHeader
        title={<div>{content.title}</div>}
        right={
          // <div className="btn-wrapper">
          //   <button
          //     className="btn"
          //     onClick={() =>
          //       nav(`/freeboard/update?contentId=${content.contentId}`)
          //     }
          //   >
          //     수정
          //   </button>
          //   <button className="btn" onClick={() => setModal(true)}>
          //     삭제
          //   </button>
          // </div>
          <EllipsisVertical>
            <button
              className="btn btn-update"
              onClick={() =>
                nav(`/freeboard/update?contentId=${content.contentId}`)
              }
            >
              수정
            </button>
            <button className="btn btn-delete" onClick={() => setModal(true)}>
              삭제
            </button>
          </EllipsisVertical>
        }
      />
      <div style={{ display: "flex", justifyContent: "space-around" }}></div>
      <div style={{ minHeight: "50vh" }}> {content.desc}</div>
      <div>
        <input type="text" placeholder="댓글입력" />
      </div>
      <div className="reply-wrap">
        {reply.map((d) => {
          return (
            <div key={Math.random()}>
              <span>{d.desc}</span>
              {d.regUser === "관리자" && <span>삭제</span>}
            </div>
          );
        })}
      </div>
      <BottomTabNavigation />
      {modal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-title"></div>
            <div className="modal-body">
              {content.title}을 삭제하시겠습니까?
            </div>
            <div className="modal-btn-wrap">
              <button
                onClick={() => {
                  alert("삭제되었습니다.");
                  nav("/freeboard");
                }}
              >
                삭제
              </button>
              <button
                onClick={() => {
                  setModal(false);
                }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
