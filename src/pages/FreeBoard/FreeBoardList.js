import { useNavigate } from "react-router-dom";
import BoardHeader from "../../components/Header/HeaderBoard";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";

// css
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import BtnFloat from "../../components/Button/BtnFloat";
import BoardList from "./BoardList";
import { FreeboardState } from "../../state/board/FreeboardState";
import "./FreeBoard.css";
import useApiHooks from "../../api/BaseApi";
import { useRef } from "react";
export default function FreeBoardList() {
  const nav = useNavigate();
  const { getApi } = useApiHooks();
  const [currentPage, setCurrentPage] = useState(0);
  const randomFreeBoardList = useRecoilValue(FreeboardState);
  const [boardList, setBoardList] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const listColRef = useRef();
  useEffect(() => {
    // setBoardList((p) => [
    //   ...p,
    //   ...randomFreeBoardList.slice(currentPage * 50, (currentPage + 1) * 50),
    // ]);
    getApi({ url: `/api/post/posts/${currentPage}` }).then((resp) => {
      console.log(resp);
      if (resp.status !== 200) return false;
      const { data } = resp;
      const { content, pageable } = data;
      setTotalCnt(data.totalElements);
      if (content !== null && content.length > 0) {
        console.log(content, pageable.pageNumber);
        setBoardList((p) => [...p, ...content]);
      }
    });
  }, [currentPage]);
  useEffect(() => {
    if (listColRef && boardList.length < totalCnt && boardList > 0) {
      if (
        listColRef.current.clientHeight >
        document.querySelector(".list-item").clientHeight * boardList.length
      ) {
        setCurrentPage((p) => p + 1);
      }
    }
  }, [boardList]);
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
        <div
          className="content scroll-hide board-list"
          onScroll={reload}
          ref={listColRef}
        >
          <BoardList list={boardList} totalCnt={totalCnt} />
        </div>
        <BtnFloat
          onClick={() => {
            nav("/freeboard/insert");
          }}
        />
      </div>

      <BottomTabNavigation />
    </div>
  );
}
