import { useEffect, useRef, useState } from "react";
import "./BeforeInstallPopup.css";
import "../Button/button.css";
import logo from "../../resources/image/logo.png";
export default function BeforeInstallPopup() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const installRef = useRef();
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      showInstallPrompt();
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  function showInstallPrompt() {
    installRef.current.style.display = "flex";
  }
  function removeInstallPrompt() {
    installRef.current.style.display = "none";
  }
  function onBtnClick() {
    removeInstallPrompt();
    if (deferredPrompt === null) {
      return;
    }
    deferredPrompt.prompt();
    deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          alert("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
      })
      .catch((err) => alert(err));
    removeInstallPrompt();
  }
  return (
    <div ref={installRef} id="intall_popup">
      <div className="popup__item">
        <img src={logo} alt="로고" />
        <span>
          PET HUB 바로가기를 <br />
          추가 하시겠습니까?
        </span>
      </div>
      <div className="popup__item">
        <button className="btn btn-confirm" onClick={onBtnClick}>
          추가
        </button>
        <button className="btn btn-delete" onClick={removeInstallPrompt}>
          취소
        </button>
      </div>
    </div>
  );
}
