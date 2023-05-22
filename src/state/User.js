import { atom } from "recoil";
import axios from "axios";
export const UserInit = {
  nickname: "",
  userImage: "",
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
        setSelf((p) => ({ ...p, ...resp.data.data, loading: true }));
      });

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const UserState = atom({
  default: { ...UserInit, loading: false },
  key: "User",
  effects: [localStorageEffect("User")],
});
