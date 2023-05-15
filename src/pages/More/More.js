import { useRecoilState, useRecoilValue } from "recoil";
import MainHeader from "../../components/Header/HeaderMain";
import MenuList from "../../components/List/MenuList";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";
import "./more.css";
import { UserState } from "../../state/User";
import useApiHooks from "../../api/BaseApi";
import { useState } from "react";
import axios from "axios";
export default function More() {
  const [user, setUser] = useRecoilState(UserState);
  const { fileUpload } = useApiHooks();
  return (
    <div id="main">
      <MainHeader />
      <div className="content">
        <div id="more-user-img">
          <img
            src={process.env.REACT_APP_API_URL + user.userImage}
            alt="유저이미지"
          />
          <input
            type="file"
            id="input-img"
            onChange={(e) => {
              var file = e.target.files[0];
              var formData = new FormData();
              formData.append("photo", file);
              axios
                .post(
                  process.env.REACT_APP_API_URL + "/api/user/image",
                  formData,
                  {
                    withCredentials: true,
                    validateStatus: false,
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }
                )
                .then((r) => {
                  setUser((p) => ({ ...p, userImage: r.data.img }));
                });
            }}
          ></input>
          <label htmlFor="input-img">수정</label>
        </div>
        <MenuList />
      </div>
      <BottomTabNavigation />
    </div>
  );
}
