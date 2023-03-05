import { useNavigate } from "react-router-dom";
import BoardHeader from "../../components/Haeder/BoardHeader";
import BottomTabNavigation from "../../components/Navigation/BottomTabNavigation";

// css
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BoardList from "../../components/List/BoardList";
import "./FreeBoard.css";
export default function FreeBoardList() {
  const nav = useNavigate();

  return (
    <div>
      <BoardHeader title="자유게시판" />
      <div className="banner">이미지</div>
      <div>
        <BoardList></BoardList>
      </div>
      <div className="float-btn" onClick={() => nav("/freeboard/insert")}>
        <FontAwesomeIcon icon={faPen} />
      </div>
      <BottomTabNavigation />
    </div>
  );
}
