import { useRecoilState } from "recoil";
import { bottomModal } from "../../state/Modal";
import "./modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
export default function BottomModal() {
  const [modalState, setModalState] = useRecoilState(bottomModal);
  const close = () => {
    setModalState({ show: false, title: "", content: <></> });
  };
  useEffect(() => {
    window.history.pushState({ page: "modal" }, document.title);
    window.addEventListener("popstate", close);
    return () => {
      window.removeEventListener("popstate", close);
    };
  }, []);
  return (
    <>
      {modalState.show && (
        <div className="modal">
          <div id="bottom-modal">
            <div id="bottom-modal-header" className="flex-row-between">
              <span>{modalState.title}</span>
              <FontAwesomeIcon
                icon={faClose}
                className="pointer"
                onClick={() => {
                  close();
                }}
              />
            </div>
            <div id="bottom-modal-body">{modalState.content}</div>
          </div>
        </div>
      )}
    </>
  );
}
