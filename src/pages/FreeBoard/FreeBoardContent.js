import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import useApiHooks from "../../api/BaseApi";
import EllipsisVertical from "../../components/Button/EllipsisVertical";
import BoardHeader from "../../components/Header/HeaderBoard";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";
import { FreeboardState } from "../../state/board/FreeboardState";
export default function FreeBoardContent() {
  const { getApi } = useApiHooks();
  const [searchParams, setSearchParams] = useSearchParams();
  const [content, setContent] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const postId = searchParams.get("contentId");
    getApi({ url: `/api/post/${postId}` }).then((resp) => {
      if (resp.data.data == null) {
        return;
      }
      setContent(resp.data.data);
    });
  }, []);

  return (
    <div id="main">
      <BoardHeader
        title={<div>자유게시판</div>}
        right={
          <EllipsisVertical>
            <button
              className="btn btn-update"
              onClick={() =>
                navigate(
                  `/freeboard/update?contentId=${
                    content.postId && content.postId
                  }`
                )
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
          <div className="info-title">{content.postTitle}</div>
          <div className="info-reg-user">
            {content.contains("user") &&
              content.user.contains("nickname") &&
              content.user.nickname}
          </div>
          <div className="info-reg-dt">
            {new Date(content.createdAt).format("yyyy-MM-dd HH:mm:ss")}
          </div>
        </div>
        <div id="board-desc">{content.postContents}</div>
      </div>

      <BottomTabNavigation />
    </div>
  );
}
