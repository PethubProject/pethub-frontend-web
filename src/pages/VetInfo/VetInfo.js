import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import useApiHooks from "../../api/BaseApi";
import BoardHeader from "../../components/Header/HeaderBoard";
import "../../components/List/list.css";
import { UserState } from "../../state/User";
import "./vetinfo.css";
import defaultImg from "../../resources/image/userDefault.png";
import LayoutVetExist from "../../components/Layout/LayoutVetExist";
import ImgWrapper from "../../components/Wrapper/ImgWrapper";
import ChangeUserImage from "../UserInfo/ChangeUserImage";
import ChangeUserPassword from "../UserInfo/ChangeUserPassword";
export default function VetInfo() {
  const [user, setUser] = useRecoilState(UserState);
  return (
    <div id="main">
      <BoardHeader title={"수의사 정보"} />
      <div className="content flex-column"></div>
    </div>
  );
}
