import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useRef, useState } from "react";
import useApiHooks from "../../api/BaseApi";
import { isEmpty } from "../../components/Utils/Utils";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Rate } from "antd";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { UserState } from "../../state/User";
export default function TeleHealthReviewInput({ setContent, setReviewList }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState({});
  const { postApi, getApi } = useApiHooks();
  const inputRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const user = useRecoilValue(UserState);
  const setUserState = useSetRecoilState(UserState);
  const userId = searchParams.get("userId");
  const onChange = useCallback((e) => {
    setComment(e.target.value);
  }, []);
  const onRatingChange = useCallback((e) => {
    setRating(e);
  }, []);

  useEffect(() => {
    setReview({ nickname: "이은호", content: comment, rating });
  }, [comment, rating]);
  const onSubmit = useCallback(() => {
    console.log(comment, userId);
    console.log(review);
    if (isEmpty(comment)) {
      alert("댓글을 입력해 주세요");
      inputRef.current.focus();
      return;
    }
    if (isEmpty(userId)) {
      alert("게시물에 오류가 있습니다.");
      return;
    }

    setReviewList((preventData) => [...preventData, review]);
  }, [comment, userId]);
  return (
    <div id="bottom-nav" className="flex-row-between">
      <Rate
        onChange={onRatingChange}
        defaultValue={5}
        style={{ display: "flex", justifyContent: "center" }}
      />
      <input
        className="comment-input"
        type="text"
        ref={inputRef}
        placeholder="리뷰 입력"
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
