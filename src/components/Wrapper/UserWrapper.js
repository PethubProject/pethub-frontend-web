import { useRecoilValue } from "recoil";
import { UserState } from "../../state/User";

export default function UserWrapper({ children, isUser, noUser }) {
  const user = useRecoilValue(UserState);
  
  return <>{user.loading && <>{user.userId ? isUser : noUser}</>}</>;
}
