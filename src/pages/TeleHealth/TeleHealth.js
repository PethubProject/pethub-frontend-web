import { useNavigate } from "react-router-dom";
import BoardHeader from "../../components/Header/HeaderBoard";

// css
import { useEffect, useState } from "react";
import { getVetList } from "../../api/TeleHealthApi";
import VetList from "../../components/List/VetList";
import { scrollReload } from "../../utils/scroll";
import useApiHooks from "../../api/BaseApi";
import "./telehealth.css";
export default function TeleHealth() {
  const nav = useNavigate();
  const { getApi } = useApiHooks();

  const [data, setData] = useState([]);

  // const [상태값 변수명, 상태값 변경 함수명] = useState(초기값);

  useEffect(() => {
    const data_load = async () => {
      var resp = await getApi({ url: "/api/vet/vets/1" });
      setData(resp.data.content);
    };
    data_load();
  }, []);
  // useEffect(함수,배열);
  // React -> 대부분 비동기로데이터를 불러온다
  // 비동기의 상태는 -> Promise
  // 2가지
  // 1. 함수.then().then()->>>>>>>>>>>
  // getApi({url:"~~",data:{~~~}}).then((resp)=>{~~~~~~~}).catch((error)=>{}).finally(()=>{});
  // async await ;

  //
  const DataList = () => {
    return data.map((d) => {
      return <div key={Math.random()}></div>;
    });
  };
  /**
   *
   * 파이썬 -> 리스트,딕션너리,튜플 -> 모두가 class
   *
   * 자바스크립트에서는 -> 배열, {}:오브젝트
   *
   * 배열 -> map((요소,인덱스)=>{
   *  요소~~
   *  인덱스!!!
   * });
   *
   * 오브젝트-> object[키]=밸류
   *
   *
   *
   */

  return (
    <div id="main">
      <BoardHeader title="비대면 진료" />
      <div className="content flex-column"></div>
      <DataList />
    </div>
  );
}
