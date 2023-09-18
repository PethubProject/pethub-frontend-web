import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import useApiHooks from "../../api/BaseApi";
import EllipsisVertical from "../../components/Button/EllipsisVertical";
import BoardHeader from "../../components/Header/HeaderBoard";
import { YesOrNoModal } from "../../components/Modal/Modals";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";
import { dateToDiffStr } from "../../components/Utils/DateTime";
import { contains, isEmpty } from "../../components/Utils/Utils";
import VetWrapper from "../../components/Wrapper/VetWrapper";
import { UserState } from "../../state/User";
import CounselCommentBootom from "./CounselCommentBottom";
export default function CounselContent() {
  const { getApi, deleteApi } = useApiHooks();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [content, setContent] = useState({});
  const [updateTarget, setUpdateTarget] = useState(-1);
  const [postId, setPostId] = useState(-1);
  const user = useRecoilValue(UserState);
  const [deleteModal, setDeleteModal] = useState(false);
  useEffect(() => {
    const postId = searchParams.get("contentId");
    setPostId(postId);
    getData(postId);
  }, []);
  const getData = (postId) => {
    getApi({ url: `/api/post/${postId}` }).then((resp) => {
      if (resp.data == null) {
        navigate(-1);
        return;
      }
      setContent(resp.data);
    });
  };
  return (
    <div id="main">
      <BoardHeader
        title={<div>상담게시판</div>}
        right={
          <Right
            content={content}
            onDelete={() => {
              setDeleteModal(true);
            }}
          />
        }
      />
      <div className="content scroll-hide">
        <div id="board-info">
          <div className="info-title">{content.title}</div>
          <div className="info-reg">
            <div className="info-reg-user">
              {contains(content, "ownerInfo") &&
                contains(content.ownerInfo, "nickname") &&
                content.ownerInfo.nickname}
            </div>
            <div className="info-reg-dt">
              {dateToDiffStr(new Date(), new Date(content.createdAt))}
            </div>
          </div>
        </div>
        <div id="board-desc">
          <p style={{ width: "100%" }}>{content.content}</p>
        </div>
        {contains(content, "commentList") && content.commentList.length > 0 && (
          <>
            <div id="board-comment">
              <span>상담 댓글 목록</span>
              <ul>
                {content.commentList.map((d, i) => {
                  const { content, vetInfo, commentId } = d;

                  return (
                    <li className="board-comment-item" key={Math.random()}>
                      <div className="board-comment-content">
                        {updateTarget === i ? (
                          <UpdateComment
                            value={content}
                            commentId={commentId}
                            postId={postId}
                            ok={(resp) => {
                              setUpdateTarget(-1);
                              getData(postId);
                            }}
                          />
                        ) : (
                          content
                        )}
                      </div>

                      {!isEmpty(vetInfo) && (
                        <div className="comment-reg">
                          <span className="comment-reg-user">
                            {vetInfo.name}
                          </span>
                          <span className="comment-reg-dt">
                            {dateToDiffStr(new Date(), new Date(d.createdAt))}
                          </span>
                          {vetInfo.vetId === user.info.vetId && (
                            <div className="comment-btn">
                              {updateTarget !== i && (
                                <span
                                  onClick={(e) => {
                                    setUpdateTarget(i);
                                  }}
                                >
                                  수정
                                </span>
                              )}
                              <span>삭제</span>
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}
      </div>
      <VetWrapper
        isVet={
          <CounselCommentBootom
            postId={content.postId}
            setContent={setContent}
          />
        }
        noVet={<BottomTabNavigation />}
      />
      
      <YesOrNoModal
        modalIsOpen={deleteModal}
        close={() => {
          setDeleteModal(false);
        }}
        confirm={() => {
          deleteApi({ url: `/api/post/${postId}` }).then((resp) => {
            if (resp.status === 200) {
              navigate(-1);
            }
          });
        }}
      >
        게시물을 삭제 하시겠습니까?
      </YesOrNoModal>
    </div>
  );
}
function UpdateComment({ value, postId, commentId, ok }) {
  const [update, setUpdate] = useState(value);
  const { putApi } = useApiHooks();

  return (
    <div className="board-comment-update">
      <input
        type="text"
        value={update}
        onChange={(e) => {
          setUpdate(e.target.value);
        }}
      />
      <span
        className="pointer"
        onClick={() => {
          putApi({
            url: `/api/post/${postId}/comment/${commentId}`,
            data: { content: update },
          }).then((resp) => ok(resp));
        }}
      >
        저장
      </span>
    </div>
  );
}
function Right({ content, onDelete }) {
  const navigate = useNavigate();
  const user = useRecoilValue(UserState);

  return (
    <>
      {contains(content, "ownerInfo") &&
      contains(content.ownerInfo, "userId") &&
      user.userId === content.ownerInfo.userId ? (
        <EllipsisVertical>
          <button
            className="btn btn-update"
            onClick={() =>
              navigate(
                `/counselboard/update?contentId=${
                  content.postId && content.postId
                }`
              )
            }
          >
            수정
          </button>
          <button className="btn btn-delete" onClick={onDelete}>
            삭제
          </button>
        </EllipsisVertical>
      ) : (
        <div className="btn-ellipsis"></div>
      )}
    </>
  );
}
