import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useRef, useState } from "react";
import useApiHooks from "../../api/BaseApi";
import { isEmpty } from "../../utils/Utils";

export default function CounselCommentBootom({ postId, setContent }) {
  const [comment, setComment] = useState("");
  const { postApi, getApi } = useApiHooks();
  const inputRef = useRef();
  const onChange = useCallback((e) => {
    setComment(e.target.value);
  }, []);
  const onSubmit = useCallback(() => {
    console.log(comment, postId);
    if (isEmpty(comment)) {
      alert("댓글을 입력해 주세요");
      inputRef.current.focus();
      return;
    }
    if (isEmpty(postId)) {
      alert("게시물에 오류가 있습니다.");
      return;
    }
    postApi({
      url: `/api/post/${postId}/comment`,
      data: { content: comment },
    }).then((resp) => {
      getApi({ url: `/api/post/${postId}` }).then((resp) => {
        if (resp.data == null) {
          return;
        }
        setContent(resp.data);
        setComment("");
        document.querySelector(".content").scrollTo(0, 500000);
      });
    });
  }, [comment, postId]);
  return (
    <div id="bottom-nav" className="flex-row-between">
      <input
        className="comment-input"
        type="text"
        ref={inputRef}
        placeholder="댓글 입력"
        maxLength="255"
        value={comment}
        onChange={onChange}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
      />
      <span className="h-bar"></span>
      <span className="btn-comment-send" onClick={onSubmit}>
        <FontAwesomeIcon icon={faPen} />
      </span>
    </div>
  );
}
