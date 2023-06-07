import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useApiHooks from "../../api/BaseApi";
import BtnUpdate from "../../components/Button/BtnUpdate";
import BoardHeader from "../../components/Header/HeaderBoard";
import LayoutUserExist from "../../components/Layout/LayoutUserExist";
import { isEmpty } from "../../utils/Utils";
import { useRecoilValue } from "recoil";
import { UserState } from "../../state/User";
import BottomFileUpload from "../../components/Navigation/BottomFileUpload";
export default function CounselUpdate() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getApi, putApi } = useApiHooks();
  const user = useRecoilValue(UserState);
  const [postData, setPostData] = useState({
    postId: "",
    title: "",
    content: "",
  });
  useEffect(() => {
    const postId = searchParams.get("contentId");
    getApi({ url: `/api/post/${postId}` }).then((resp) => {
      if (resp.status !== 200) {
        alert("서버 통신 실패");
        navigate("/freeboard");
      }
      const { data } = resp;
      if (data == null) {
        alert("등록된 글 데이터가 없습니다.");
        navigate("/freeboard");
      }
      if (user.postId !== data.ownerInfo.postId) {
        alert("잘 못된 접속입니다.");
        navigate("/freeboard");
      }
      setPostData(resp.data);
    });
  }, []);
  const onFormChagne = useCallback((e) => {
    const { name, value } = e.target;
    setPostData((p) => ({ ...p, [name]: value }));
  }, []);

  const onUpdate = useCallback(() => {
    var ok = true;
    Object.keys(postData).map((k) => {
      const v = postData[k];
      if (isEmpty(v)) {
        var target = document.querySelector(`[name="${k}"]`);
        if (!isEmpty(target)) {
          target.focus();
          ok = false;
          return false;
        }
      }
    });
    if (!ok) {
      return false;
    }
    putApi({ url: `/api/post/${postData.postId}`, data: postData }).then(
      (resp) => {
        if (resp.status === 200) {
          navigate(`/counselboard/content?contentId=${postData.postId}`, {
            replace: true,
          });
        }
      }
    );
  }, []);
  return (
    <LayoutUserExist>
      <div id="main">
        <BoardHeader
          title="상담게시판 글 수정"
          right={
            <div className="btn-wrapper">
              {/* <button className="btn">임시저장</button> */}
              <BtnUpdate onClick={onUpdate} />
            </div>
          }
        />

        <form id="board" className="content">
          <div className="board-form">
            <div className="board-form-item">
              <label>제목</label>
              <input
                className="board-form-input"
                type="text"
                placeholder="제목입력"
                onChange={onFormChagne}
                value={postData.title}
                name="title"
                maxLength="255"
              />
            </div>
            <div className="board-form-item board-form-content">
              <label>내용</label>
              <textarea
                className="board-form-textarea"
                placeholder="내용입력"
                onChange={onFormChagne}
                onPaste={onFormChagne}
                value={postData.content}
                name="content"
                maxLength="1024"
              ></textarea>
            </div>
          </div>
        </form>
        <BottomFileUpload />
      </div>
    </LayoutUserExist>
  );
}
