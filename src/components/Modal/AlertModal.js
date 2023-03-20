import { useRecoilState } from "recoil";
import BtnConfirm from "../Button/BtnConfirm";
import CenterModal from "./CenterModal";
import { modalState } from "./Modal";

export default function AlertModal({ msg, onClick = () => {} }) {
  const [modal, setModal] = useRecoilState(modalState);
  return (
    <CenterModal>
      <div id="modal-header"></div>
      <div id="modal-body">{msg}</div>
      <div id="modal-btn">
        <BtnConfirm
          onClick={(e) => {
            setModal({ status: false, type: "" });
            onClick(e, setModal);
          }}
        />
      </div>
    </CenterModal>
  );
}
