import { useNavigate } from "react-router-dom";
import BoardHeader from "../../components/Header/HeaderBoard";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";

// css
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import useApiHooks from "../../api/BaseApi";
import BtnFloat from "../../components/Button/BtnFloat";
import LayoutUserExist from "../../components/Layout/LayoutUserExist";
import { UserState } from "../../state/User";
import "./Board.css";
import BoardList from "./BoardList";
import { contains, isEmpty } from "../../components/Utils/Utils";
export default function CounselList() {
  const nav = useNavigate();
  const { getApi } = useApiHooks();
  const [currentPage, setCurrentPage] = useState(0);
  const [boardList, setBoardList] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const listColRef = useRef();
  const user = useRecoilValue(UserState);
  useEffect(() => {
    if (user.loading && !isEmpty(user.email)) {
      const url = user.role === "OWNER" ? `/api/post/posts/${user.userId}/${currentPage}` : `/api/post/posts/${currentPage}`;
      getApi({ url: url }).then((resp) => {
        if (resp.status !== 200) return false;
        let data = {};
        if (contains(resp.data, "content")) {
          data = resp.data;
        } else {
          data = resp.data.data;
        }
        const { content, pageable } = data;
        setTotalCnt(data.totalElements);
        if (content !== null && content.length > 0) {
          setBoardList((p) => [...p, ...content]);
        }
      });
    }
  }, [currentPage, user]);
  useEffect(() => {
    if (listColRef && boardList.length < totalCnt && boardList > 0) {
      if (listColRef.current.clientHeight > document.querySelector(".list-item").clientHeight * boardList.length) {
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
    <LayoutUserExist>
      <div id="main">
        <BoardHeader title="상담 게시판" />
        <div className="content flex-column">
          <div className="content scroll-hide board-list" onScroll={reload} ref={listColRef}>
            <BoardList list={boardList} totalCnt={totalCnt} />
          </div>
          {user.role === "OWNER" && (
            <BtnFloat
              onClick={() => {
                nav("/counselboard/insert");
              }}
            />
          )}
        </div>

        <BottomTabNavigation />
      </div>
    </LayoutUserExist>
  );
}
