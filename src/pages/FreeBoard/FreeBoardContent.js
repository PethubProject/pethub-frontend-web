import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import EllipsisVertical from "../../components/Button/EllipsisVertical";
import BoardHeader from "../../components/Header/HeaderBoard";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";
import useApiHooks from "../../api/BaseApi";
import { contains } from "../../utils/Utils";
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { UserState } from "../../state/User";
import { modalState } from "../../components/Modal/Modal";
import { dateToDiffStr } from "../../utils/DateTime";
export default function FreeBoardContent() {
  const { getApi } = useApiHooks();
  const [searchParams, setSearchParams] = useSearchParams();
  const [content, setContent] = useState({});

  useEffect(() => {
    const postId = searchParams.get("contentId");
    getApi({ url: `/api/post/${postId}` }).then((resp) => {
      if (resp.data == null) {
        return;
      }
      setContent(resp.data);
    });
  }, []);

  return (
    <div id="main">
      <BoardHeader
        title={<div>자유게시판</div>}
        right={<Right content={content} />}
      />
      <div className="content scroll-hide">
        <div id="board-info">
          <div className="info-title">{content.title}</div>
          <div className="info-reg">
            <div className="info-reg-user">
              {contains(content, "user") &&
                contains(content.user, "nickname") &&
                content.user.nickname}
            </div>
            <div className="info-reg-dt">
              {dateToDiffStr(new Date(), new Date(content.createdAt))}
            </div>
          </div>
        </div>
        <div id="board-desc">
          <p style={{ width: "100%" }}>{content.content}</p>
        </div>
      </div>

      <BottomTabNavigation />
    </div>
  );
}

function Right({ content }) {
  const navigate = useNavigate();
  const user = useRecoilValue(UserState);
  const setModal = useSetRecoilState(modalState);
  const modalReset = useResetRecoilState(modalState);
  const { deleteApi } = useApiHooks();
  return (
    <>
      {contains(content, "user") &&
      contains(content.user, "email") &&
      user.email === content.user.email ? (
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
              setModal((p) => {
                p = {
                  ...p,
                  ...{
                    status: true,
                    type: "alert",
                    msg: "삭제하시겠습니까?",
                    onClick: (e) => {
                      deleteApi({
                        url: `/api/post/${content.postId}`,
                      }).then((resp) => {
                        if (resp.status === 200) {
                          navigate("/freeboard");
                          alert("삭제 완료");
                        } else {
                          alert("삭제실패");
                        }
                        modalReset();
                      });
                    },
                  },
                };
                return p;
              });
            }}
          >
            삭제
          </button>
        </EllipsisVertical>
      ) : null}
    </>
  );
}
