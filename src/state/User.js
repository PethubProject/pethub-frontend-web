import { atom } from "recoil";
export const UserInit = {
  memberId: "",
};

export const UserState = atom({
  default: UserInit,
  key: "User",
});
