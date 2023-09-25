import { atom } from "recoil";
import axios from "axios";
import { api } from "../api/BaseApi";
export const UserInit = {
  name: "",
  userId: "",
  role: "",
  userImage: "",
  email: "",
  // authTokenResponseDto: {},
  info: {},
  reviewList: [],
  loading: true,
};

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    checkSignIn(setSelf);
  };

const checkSignIn = (setSelf) => {
  const config = {
    withCredentials: true,
    validateStatus: false,
  };
  api
    .get("/api/user/info", config)
    .then((resp) => {
      setSelf((p) => ({
        ...p,
        ...resp.data,
      }));
    })
    .catch((err) => console.log("유저 정보 불러오기 : " + err.message))
    .finally(() => {
      setSelf((p) => ({ ...p, loading: true }));
    });
};

export const UserState = atom({
  default: { ...UserInit, loading: false },
  key: "User",
  effects: [localStorageEffect("User")],
});
