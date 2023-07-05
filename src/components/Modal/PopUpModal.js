import { useRecoilState } from "recoil";
import BtnCloseIcon from "../Button/BtnCloseIcon";
import CenterModal from "./CenterModal";
import { modalState } from "./Modal";

export default function PopupModal({ head = "", body, onClose = () => {} }) {
  const [modal, setModal] = useRecoilState(modalState);
  return (
    <CenterModal>
      <div className="modal-header popup-modal-header">
        <span>{head}</span>
        <div className="modal-btn">
          <BtnCloseIcon
            onClick={(e) => {
              setModal({ status: false, type: "" });
              onClose(e, setModal);
            }}
          />
        </div>
      </div>
      <div className="modal-body popup-modal">{body}</div>
    </CenterModal>
  );
}
