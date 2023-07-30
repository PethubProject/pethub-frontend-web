import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import EllipsisVertical from "../../components/Button/EllipsisVertical";
import BoardHeader from "../../components/Header/HeaderBoard";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";
import useApiHooks from "../../api/BaseApi";
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { UserState } from "../../state/User";
import { contains } from "../../components/Utils/Utils";
import { dateToDiffStr } from "../../components/Utils/DateTime";
export default function FreeBoardContent() {
  const { getApi } = useApiHooks();

  return <div>수의사 상세보기</div>;
}
