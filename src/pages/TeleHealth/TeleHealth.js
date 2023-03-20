import { useNavigate } from "react-router-dom";
import BoardHeader from "../../components/Header/HeaderBoard";

// css
import { useEffect, useState } from "react";
import { getVetList } from "../../api/TeleHealthApi";
import VetList from "../../components/List/VetList";
import { scrollReload } from "../../utils/scroll";
import "./telehealth.css";
export default function TeleHealth() {
  const nav = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [vetList, setVetList] = useState([]);
  const [total, setTotal] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getVetList().then((r) => {
      setTotal(r);
    });
  }, []);
  useEffect(() => {
    setLoading(true);
    setVetList((p) => {
      p = [...p, ...total.slice(currentPage * 50, (currentPage + 1) * 50)];
      setLoading(false);
      return p;
    });
  }, [currentPage, total]);

  return (
    <div id="main">
      <BoardHeader title="비대면 진료" />
      <div className="content flex-column">
        <div className="flex-center board-info" style={{ gap: "16px" }}>
          <div>전체 게시물 : {total.length}</div>
          <div>현재 게시물 : {vetList.length}</div>
        </div>
        <div
          id="vet-list"
          className="content scroll-hide"
          onScroll={(e) => {
            scrollReload(e, () => {
              if (!loading) {
                setCurrentPage((p) => p + 1);
              }
            });
          }}
        >
          <VetList list={vetList} />
        </div>
      </div>
    </div>
  );
}
