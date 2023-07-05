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
    .get("/api/user", config)
    .then((resp) => {
      const { role, userId, authTokenResponseDto } = resp.data.data;

      setSelf((p) => ({
        ...p,
        ...resp.data.data,
      }));
      if (role === "VET") {
        resp.data.data.userImage = resp.data.data.vetImage;
      }
      if (role === "OWNER") {
        resp.data.data.userImage = resp.data.data.ownerImage;
        axios.get(process.env.REACT_APP_API_URL + `/api/owner`, config).then((resp) => {
          setSelf((p) => ({
            ...p,
            info: { ...p.info, ...resp.data.data },
          }));
        });
      }
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
