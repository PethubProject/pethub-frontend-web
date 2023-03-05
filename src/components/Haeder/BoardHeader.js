import { Goback } from "../Button/GoBack";

export default function BoardHeader({ title, left, right }) {
  return (
    <div style={boarderHeaderStyle}>
      <div style={boarderHeaderLeftStyle}>{left ? left : <Goback />}</div>
      <div style={boarderHeaderTitleStyle}>{title}</div>
      <div style={boarderHeaderRightStyle}>{right ? right : "오른쪽"}</div>
    </div>
  );
}

const boarderHeaderStyle = {
  display: "flex",
  height: "48px",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  position: "relative",
};

const boarderHeaderLeftStyle = {
  marginRight: "auto",
  marginLeft: "16px",
  cursor: "pointer",
};
const boarderHeaderRightStyle = {
  marginLeft: "auto",
  marginRight: "16px",
  cursor: "pointer",
};
const boarderHeaderTitleStyle = {
  fontSize: "18px",
  position: "absolute",
};
