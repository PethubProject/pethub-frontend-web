import BtnGoBack from "../Button/BtnGoBack";
import { isEmpty } from "../Utils/Utils";
export default function BoardHeader({ title, left, right, className }) {
  return (
    <header className={`board ${!isEmpty(className) ? className : ""}`}>
      <div>
        <BtnGoBack />
      </div>
      <div>{title}</div>
      <div>{right ? right : ""}</div>
    </header>
  );
}
