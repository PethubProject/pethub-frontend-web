import { atom } from "recoil";
export const UserInit = {
  nickName: "",
  userImage: "",
};

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const UserState = atom({
  default: UserInit,
  key: "User",
  effects: [localStorageEffect("User")],
});
