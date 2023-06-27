import { atom } from "recoil";
import axios from "axios";
export const UserInit = {
  nickname: "",
  userImage: "",
  email: "",
  loading: true,
};

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/user", {
        withCredentials: true,
        validateStatus: false,
      })
      .then((resp) => {
        setSelf((p) => ({ ...p, ...resp.data.data }));
      })
      .catch((err) => alert("유저 정보 불러오기 : " + err.message))
      .finally(() => {
        setSelf((p) => ({ ...p, loading: true }));
      });
  };

export const UserState = atom({
  default: { ...UserInit, loading: false },
  key: "User",
  effects: [localStorageEffect("User")],
});
