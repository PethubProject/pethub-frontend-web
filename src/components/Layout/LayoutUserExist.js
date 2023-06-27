import { Navigate } from "react-router-dom";
import UserWrapper from "../Wrapper/UserWrapper";
export default function LayoutUserExist({ children }) {
  return (
    <UserWrapper
      isUser={children}
      noUser={
        <Navigate to="/signin" state={{ prevPath: window.location.pathname }} />
      }
    ></UserWrapper>
  );
}
