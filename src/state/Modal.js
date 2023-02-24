import { atom } from "recoil";

export const bottomModal = atom({
  key: "Modal",
  default: { show: false, title: "", content: <></> },
});
