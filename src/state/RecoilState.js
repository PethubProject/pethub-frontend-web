import uuid from "react-uuid";
import { atom } from "recoil";

const sessionIdEffect =
  (key) =>
  ({ setSelf }) => {
    const value = localStorage.getItem(key);
    if (value != null) {
      setSelf(value);
    } else {
      const uuidValue = uuid().replace(/[-]+/gi, "");
      setSelf(uuidValue);
      localStorage.setItem(key, uuidValue);
    }
  };

export const sessionId = atom({
  key: "sessionId",
  default: {},
  effects: [sessionIdEffect("sessionId")],
});
