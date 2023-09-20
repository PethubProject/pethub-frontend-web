import BottomTabNavigation from "../../components/Navigation/NavigationBottom";
import TeleHealthReviewInput from "./TeleHealthReviewInput";
import { useSearchParams } from "react-router-dom";
import React, { useCallback, useState } from "react";
import BoardHeader from "../../components/Header/HeaderBoard";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { UserState } from "../../state/User";
import { useEffect } from "react";
import { Rate } from "antd";
export default function TeleHealthReview({
  // reviewList,
  setContent,
}) {
  const user = useRecoilValue(UserState);
  const setUserState = useSetRecoilState(UserState);
  const [searchParams, setSearchParams] = useSearchParams();
  const [reviewList, setReviewList] = useState(user.reviewList);
  console.log(reviewList);
  useEffect(() => {
    setUserState((p) => ({
      ...p,
      ["reviewList"]: reviewList,
    }));
  }, [reviewList]);

  return (
    <div
      id="main"
      style={{ display: "flex", justifyContent: "center", gap: "32px" }}
    >
      <BoardHeader title="리뷰 목록" />
      <div className="content">
        {reviewList.map((d, i) => {
          const { nickname, content, rating } = d;

          return (
            <div
              className="board-comment-item"
              key={Math.random()}
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "32px",
                borderWidth: "5px",
              }}
            >
              {nickname}
              <div className="board-comment-content">{content}</div>

              <Rate value={rating} />
            </div>
          );
        })}
      </div>
      <TeleHealthReviewInput
        setContent={setContent}
        setReviewList={setReviewList}
      />
    </div>
  );
}
