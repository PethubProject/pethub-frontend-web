import { atom } from "recoil";
export const UserInit = {
  nickName: "",
  userImage: "",
};

export const UserState = atom({
  default: UserInit,
  key: "User",
});
