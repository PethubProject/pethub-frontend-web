import { Navigate } from "react-router-dom";
import VetWrapper from "../Wrapper/VetWrapper";
export default function LayoutVetExist({ children }) {
  return (
    <VetWrapper
      isVet={children}
      noVet={
        <Navigate to="/signin" state={{ prevPath: window.location.pathname }} />
      }
    ></VetWrapper>
  );
}
