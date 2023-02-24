import { useRecoilState } from "recoil";
import { bottomModal } from "../../state/Modal";
import "./modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
export default function BottomModal() {
  const [modalState, setModalState] = useRecoilState(bottomModal);
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
                  setModalState({ show: false, title: "", content: <></> });
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
