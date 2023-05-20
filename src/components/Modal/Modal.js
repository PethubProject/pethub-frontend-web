import { atom, useRecoilState } from "recoil";
import AlertModal from "./AlertModal";
import PopupModal from "./PopUpModal";

export default function Modal() {
  const [modal, setModal] = useRecoilState(modalState);
  const modalType = {
    alert: (
      <AlertModal
        msg={modal.msg}
        onClick={(e, s) => {
          if (modal.onClick) {
            modal.onClick(e, s);
          }
        }}
      />
    ),
    popup: (
      <PopupModal
        head={modal.head}
        body={modal.body}
        onClose={(e, s) => {
          if (modal.onClose) {
            modal.onClose(e, s);
          }
        }}
      />
    ),
    "": null,
  };

  return <>{modal.status ? <div>{modalType[modal.type]}</div> : null}</>;
}

export const modalState = atom({
  key: "modalState",
  default: { status: false, type: "", msg: "", body: "", head: "" },
});
