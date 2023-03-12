import { useNavigate } from "react-router-dom";
import BoardHeader from "../../components/Header/HeaderBoard";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";

// css
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BoardList from "../../components/List/BoardList";
import "./FreeBoard.css";
import LayoutDefault from "../../components/Layout/LayoutDefault";
export default function FreeBoardList() {
  const nav = useNavigate();

  return (
    <div id="main">
      <BoardHeader title="자유게시판" />
      <div className="content">
        <div className="banner">이미지</div>
        <div>
          <BoardList />
        </div>
        <div className="float-btn" onClick={() => nav("/freeboard/insert")}>
          <FontAwesomeIcon icon={faPen} />
        </div>
      </div>
      <BottomTabNavigation />
    </div>
  );
}
