import { useSearchParams } from "react-router-dom";
import useApiHooks from "../../api/BaseApi";
import { useEffect } from "react";
export default function TeleHealthContent() {
  const [searchParams,setSearchParams] = useSearchParams();
  
  const { getApi } = useApiHooks();
  //"api/vet/{vetId}"
  useEffect(()=>{
    getApi({url:`api/vet/${searchParams.get("userId")}`}).then(resp=>console.log(resp))
  },[])
  return <div id="main"><div className="content">
    수의사 상세보기</div></div>;
}
