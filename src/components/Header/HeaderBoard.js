import BtnGoBack from "../Button/BtnGoBack";

export default function BoardHeader({ title, left, right }) {
  return (
    <header>
      <div>
        <BtnGoBack />
      </div>
      <div>{title}</div>
      <div>{right ? right : ""}</div>
    </header>
  );
}
