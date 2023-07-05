import { useRecoilValue } from "recoil";
import { UserState } from "../../state/User";

export default function VetWrapper({ children, isVet, noVet }) {
  const user = useRecoilValue(UserState);
  return (
    <>
      {user.loading && (
        <>{user.userId && user.role === "VET" ? isVet : noVet}</>
      )}
    </>
  );
}
