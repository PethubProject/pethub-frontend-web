import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyFreeBoardContent } from "../../api/dummy";

export default function BoardList({ url, params }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        overflow: "auto",
        padding: "16px",
      }}
    >
      {loading ? (
        <LoadingElement></LoadingElement>
      ) : (
        <DrawList items={dummyFreeBoardContent}></DrawList>
      )}
    </div>
  );
}

function LoadingElement() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: "0",
        left: 0,
        backgroundColor: "rgba(200,200,200,0.3)",
        zIndex: 999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      로딩중
    </div>
  );
}

function DrawList({ items }) {
  const nav = useNavigate();
  return (
    <>
      {items.map((d) => {
        return (
          <div
            key={Math.random()}
            style={{ width: "100%", cursor: "pointer" }}
            onClick={() => {
              nav(`/freeboard/content?contentId=${d.contentId}`);
            }}
          >
            <div>{d.title}</div>
            <div>{d.regUser}</div>
            <div>{d.regDt}</div>
          </div>
        );
      })}
    </>
  );
}
