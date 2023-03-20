import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { dummyFreeBoardReply, randomFreeBoardReplyList } from "../../api/dummy";
import BtnRegister from "../../components/Button/BtnRegister";
import EllipsisVertical from "../../components/Button/EllipsisVertical";
import BoardHeader from "../../components/Header/HeaderBoard";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";
import { FreeboardState } from "../../state/board/FreeboardState";

export default function FreeBoardContent() {
  const [modal, setModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [randomFreeBoardList, setRendomFreeBoardList] =
    useRecoilState(FreeboardState);
  const [content, setContent] = useState({
    title: "",
    contentId: null,
    desc: "",
  });
  const [reply, setReply] = useState([]);
  useEffect(() => {
    const item = randomFreeBoardList.filter(
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
  const navigate = useNavigate();
  return (
    <div id="main">
      <BoardHeader
        title={<div>{content.title}</div>}
        right={
          <EllipsisVertical>
            <button
              className="btn btn-update"
              onClick={() =>
                navigate(`/freeboard/update?contentId=${content.contentId}`)
              }
            >
              수정
            </button>
            <button
              className="btn btn-delete"
              onClick={() => {
                navigate("/freeboard");
              }}
            >
              삭제
            </button>
          </EllipsisVertical>
        }
      />
      <div className="content scroll-hide">
        <div id="board-info">
          <div className="info-title">{content.title}</div>
          <div className="info-reg-user">{content.regUser}</div>
          <div className="info-reg-dt">{content.regDt}</div>
        </div>
        <div id="board-desc">{content.desc}</div>
        <div id="board-reply">
          <div id="board-reply-title">댓글 목록</div>
          {randomFreeBoardReplyList(10).map((d) => {
            return (
              <div key={Math.random()} className="reply-info">
                <div className="reply-desc">{d.desc}</div>
                {d.regUser === "유저 4" && (
                  <div className="reply-delete">
                    <span>삭제</span>
                  </div>
                )}
                <div className="reply-reg-user">{d.regUser}</div>

                <div className="reply-reg-dt">{d.regDt}</div>
              </div>
            );
          })}
          <div className="reply-input">
            <div className="input-wrap">
              <input type="text" placeholder="댓글입력" />
            </div>
            <div className="btn-wrap ">
              <BtnRegister> 등록</BtnRegister>
            </div>
          </div>
        </div>
      </div>

      <BottomTabNavigation />
      {/* {modal && (
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
      )} */}
    </div>
  );
}
