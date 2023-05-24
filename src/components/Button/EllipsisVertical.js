import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function EllipsisVertical({ children }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        style={{ padding: "16px", position: "relative", cursor: "pointer" }}
        onClick={() => {
          setShow((p) => !p);
        }}
      >
        <FontAwesomeIcon icon={faEllipsisVertical} />
        {show && (
          <div
            style={{
              position: "absolute",
              width: "96px",
              display: "flex",
              backgroundColor: "white",
              flexDirection: "column",
              gap: "8px",
              right: "8px",
              padding: "8px",
              top: "45px",
              border: "1px solid #d9d9d9",
            }}
          >
            {children}
          </div>
        )}
      </div>
    </>
  );
}
