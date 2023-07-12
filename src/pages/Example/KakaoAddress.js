import { useEffect, useState } from "react";
import KakaoMapByAddress from "../../components/kakao/map/KakaoMapByAddress";
import InputAddress from "../../components/Input/InputAddress";
import InputText from "../../components/Input/InputText";
import MainHeader from "../../components/Header/HeaderMain";
export default function KakaoAddress() {
  const [addressData, setAddressData] = useState({});
  const [name, setName] = useState("");

  return (
    <div id="main">
      <MainHeader title={"카카오 주소 및 지도"} />
      <div className="content">
        <div style={{ width: "100%" }}>
          <InputText state={setName} label={"병원이름"} />
          <InputAddress Address setData={setAddressData} />
        </div>

        <div style={{ width: "100%", height: "50%" }}>
          <KakaoMapByAddress style={{ width: "100%", height: "100%" }} address={addressData.roadAddress} name={name} />
        </div>
        {/* <AlertModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} /> */}
      </div>
    </div>
  );
}
