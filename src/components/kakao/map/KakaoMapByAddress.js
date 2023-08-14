import { useEffect, useRef, useState } from "react";
import logo from "../../../resources/image/logo.png";
import "./kakaoMap.css";
import { isEmpty } from "../../Utils/Utils";
export default function KakaoMapByAddress(props) {
  const kakao = window.kakao;
  var geocoder = new kakao.maps.services.Geocoder();
  const mapRef = useRef();
  const [overlay, setOverlay] = useState({});

  useEffect(() => {
    console.log(props)
    if (!props.address || isEmpty(props?.address)) return;

    // map.setDraggable(false);
    // map.setZoomable(false);
    var content = `<div class="custom_overlay map_by_address"><img src="${logo}"/><span id="overy_text_cc">${props.name || ""}</span></div>`;

    geocoder.addressSearch(props.address, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        var mapContainer = mapRef.current, // 지도를 표시할 div
          mapOption = {
            center: coords, // 지도의 중심좌표
            level: 1, // 지도의 확대 레벨
          };

        var map = new kakao.maps.Map(mapContainer, mapOption);
        var overlay = new kakao.maps.CustomOverlay({
          position: coords,
          content: content,
        });
        overlay.setMap(map);
        setOverlay({ item: overlay, map: map, coords: coords });
      }
    });
  }, [props.address]);

  useEffect(() => {
    var content = `<div class="custom_overlay map_by_address"><img src="${logo}"/><span id="overy_text_cc">${props.name || ""}</span></div>`;
    // var overlay = new kakao.maps.CustomOverlay({
    //   position: overay.coords,
    //   content: content,
    // });
    if (overlay?.item) {
      overlay?.item.setPosition(overlay.coords);
      overlay?.item.setContent(content);
      overlay?.item.setMap(overlay.map);
    }
  }, [props.address, props.name, overlay]);
  return <div {...props} ref={mapRef}></div>;
}
