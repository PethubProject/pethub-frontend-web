import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function EllipsisVertical({ children }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        style={{ padding: "16px", position: "relative" }}
        onClick={() => {
          setShow((p) => !p);
        }}
      >
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </div>
      {show && (
        <div
          style={{
            position: "absolute",
            width: "96px",
            border: "1px solid black",
            right: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {children}
        </div>
      )}
    </>
  );
}
