import { useNavigate } from "react-router-dom";
import BoardHeader from "../../components/Header/HeaderBoard";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";

// css
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import BtnFloat from "../../components/Button/BtnFloat";
import BoardList from "../../components/List/BoardList";
import { FreeboardState } from "../../state/board/FreeboardState";
import "./FreeBoard.css";
import useApiHooks from "../../api/BaseApi";
export default function FreeBoardList() {
  const nav = useNavigate();
  const { getApi } = useApiHooks();
  const [currentPage, setCurrentPage] = useState(0);
  const randomFreeBoardList = useRecoilValue(FreeboardState);
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    // setBoardList((p) => [
    //   ...p,
    //   ...randomFreeBoardList.slice(currentPage * 50, (currentPage + 1) * 50),
    // ]);
    getApi({ url: "/api/post/paging", data: { page: currentPage } }).then(
      (resp) => {
        if (resp.data.data !== null) {
          setBoardList((p) => [...p, ...resp.data.data.content]);
        }
      }
    );
  }, [currentPage]);
  const reload = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const reloadPoint = scrollTop + clientHeight;
    if (reloadPoint < scrollHeight && reloadPoint > scrollHeight - 36) {
      setCurrentPage((p) => p + 1);
    }
  };

  return (
    <div id="main">
      <BoardHeader title="자유게시판" />
      <div className="content flex-column">
        <div className="flex-center board-info" style={{ gap: "16px" }}>
          <div>전체 게시물 : {randomFreeBoardList.length}</div>
          <div>현재 게시물 : {(currentPage + 1) * 50}</div>
        </div>
        <div className="content scroll-hide board-list" onScroll={reload}>
          <BoardList list={boardList} />
        </div>
      </div>

      <BottomTabNavigation />

      <BtnFloat
        onClick={() => {
          nav("/freeboard/insert");
        }}
      />
    </div>
  );
}
