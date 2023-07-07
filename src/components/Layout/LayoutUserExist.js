import { Navigate, useLocation } from "react-router-dom";
import UserWrapper from "../Wrapper/UserWrapper";
export default function LayoutUserExist({ children }) {
  const location = useLocation();

  return <UserWrapper isUser={children} noUser={<Navigate to="/signin" state={{ prevPath: location.pathname }} replace={true} />}></UserWrapper>;
}
