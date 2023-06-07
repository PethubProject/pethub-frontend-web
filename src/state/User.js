import { atom } from "recoil";
import axios from "axios";
export const UserInit = {
  name: "",
  userId: "",
  role: "",
  userImage: "",
  email: "",
  authTokenResponseDto: {},
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
  axios
    .get(process.env.REACT_APP_API_URL + "/api/user", config)
    .then((resp) => {
      const { role, userId } = resp.data.data;
      let userIamge = "";
      setSelf((p) => ({
        ...p,
        ...resp.data.data,
      }));
      if (role === "VET") {
        axios
          .get(process.env.REACT_APP_API_URL + `/api/vet/${userId}`, config)
          .then((resp) => {
            setSelf((p) => ({
              ...p,
              info: { ...p.info, ...resp.data.data },
              userImage: resp.data.data.vetIamge,
            }));
          });
      }
      if (role === "OWNER") {
        axios
          .get(process.env.REACT_APP_API_URL + `/api/owner`, config)
          .then((resp) => {
            setSelf((p) => ({
              ...p,
              info: { ...p.info, ...resp.data.data },
            }));
          });
      }
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
