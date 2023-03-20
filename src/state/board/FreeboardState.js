import { atom } from "recoil";
import { randomFreeBoardList } from "../../api/dummy";

export const FreeboardState = atom({
  default: randomFreeBoardList(),
  key: "FreeboardState",
});
