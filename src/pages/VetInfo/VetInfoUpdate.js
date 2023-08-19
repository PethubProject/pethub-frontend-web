import { useRecoilValue } from "recoil";
import useApiHooks from "../../api/BaseApi";
import BoardHeader from "../../components/Header/HeaderBoard";
import LayoutVetExist from "../../components/Layout/LayoutVetExist";
import "../../components/List/list.css";
import "./vetinfo.css";
import { UserState } from "../../state/User";
import { useEffect, useRef, useState } from "react";
import { TimePicker } from "react-ios-time-picker";
export default function VetInfoUpdate() {
  const user = useRecoilValue(UserState);
  const ref = useRef();
  const [vetInfo, setVetInfo] = useState({
    openTm: "17:00",
    clinicHour: "",
  });
  const [load, setLoad] = useState(false);
  const { getApi } = useApiHooks();
  useEffect(() => {
    getApi({ url: `/api/vet/${user.userId}` }).then((resp) => console.log(resp));
  }, []);

  return (
    <LayoutVetExist>
      <div id="main">
        <BoardHeader title={"수의사 정보"} />

        <div className="content flex-column">
          <label htmlFor="timeInput">{vetInfo.openTm}</label>

          <TimePicker
            saveButtonText="확인"
            cancelButtonText="취소"
            onChange={(timeValue) => {
              setVetInfo((p) => ({ ...p, openTm: timeValue }));
            }}
            value={vetInfo.openTm}
            popupClassName="ss"
          />
        </div>
      </div>
    </LayoutVetExist>
  );
}
