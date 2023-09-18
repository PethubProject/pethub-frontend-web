import BottomTabNavigation from "../../components/Navigation/NavigationBottom";
import TeleHealthReviewInput from "./TeleHealthReviewInput";
import { useSearchParams } from "react-router-dom";
import React, { useCallback, useState } from "react";
import BoardHeader from "../../components/Header/HeaderBoard";
export default function TeleHealthReview({ setContent }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reviewList, setReviewList] = useState([
    {
      content: "이집잘하네",
      rating: "5",
    },
    {
      content: "접자",
      rating: "1",
    },
    {
      content: "무난",
      rating: "3",
    },
    {
      content: "이집잘하네",
      rating: "5",
    },
    {
      content: "접자",
      rating: "1",
    },
    {
      content: "무난",
      rating: "3",
    },
    {
      content: "이집잘하네",
      rating: "5",
    },
    {
      content: "접자",
      rating: "1",
    },
    {
      content: "무난",
      rating: "3",
    },
    {
      content: "이집잘하네",
      rating: "5",
    },
    {
      content: "접자",
      rating: "1",
    },
    {
      content: "무난",
      rating: "3",
    },
  ]);

  return (
    <div
      id="main"
      // style={{ display: "flex", justifyContent: "center", gap: "32px" }}
    >
      <BoardHeader title="리뷰 목록" />
      <div className="content">
      {reviewList.map((d, i) => {
        const { content, rating } = d;

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
            <div className="board-comment-content">{content}</div>

            {rating}
          </div>
        );
      })}
      </div>
      <TeleHealthReviewInput setContent={setContent} />
      {/* <BottomTabNavigation /> */}
    </div>
  );
}
