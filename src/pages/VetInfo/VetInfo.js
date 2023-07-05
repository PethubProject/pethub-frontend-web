import BoardHeader from "../../components/Header/HeaderBoard";
import "../../components/List/list.css";
import "./vetinfo.css";
export default function VetInfo() {
  return (
    <div id="main">
      <BoardHeader title={"수의사 정보"} />
      <div className="content flex-column"></div>
    </div>
  );
}
