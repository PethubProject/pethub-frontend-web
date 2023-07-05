import { useRecoilValue } from "recoil";
import { UserState } from "../state/User";

export const useUserRole = () => {
  const user = useRecoilValue(UserState);
  if (user.role === "VET") {
  }
  if (user.role === "OWNER") {
  }
};
