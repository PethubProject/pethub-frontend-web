import { atom, useRecoilState } from "recoil";
import AlertModal from "./AlertModal";

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
    "": null,
  };

  return <>{modal.status ? <div>{modalType[modal.type]}</div> : null}</>;
}

export const modalState = atom({
  key: "modalState",
  default: { status: false, type: "", msg: "" },
});
