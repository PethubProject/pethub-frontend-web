import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useFetcher, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

Modal.setAppElement("#root");
export function AlertModal({ modalIsOpen, setIsOpen, style }) {
  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} style={style || {}} onRequestClose={closeModal} contentLabel="Example Modal">
      <div>test</div>
    </Modal>
  );
}

export function AddressSearchModal({ modalIsOpen, setIsOpen, onComplete = () => {} }) {
  const searchRef = useRef();
  function closeModal() {
    setIsOpen(false);
    loadSearchPannel();
  }
  useEffect(() => {
    if (window.cordova?.InAppBrowser.open) {
      window.open = window.cordova.InAppBrowser.open;
    }
    loadSearchPannel();
  }, []);
  const loadSearchPannel = useCallback(() => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        onComplete(data);
      },
      onclose: function (state) {
        if (state === "FORCE_CLOSE") {
        } else if (state === "COMPLETE_CLOSE") {
          closeModal();
        }
      },
      width: "100%",
      height: "100%",
      submitMode: false,
    }).embed(searchRef.current);
  }, []);

  return (
    <SModalOveray display={modalIsOpen ? "block" : "none"}>
      <STopHeader
        onClick={() => {
          closeModal();
        }}
      >
        <span>
          <FontAwesomeIcon icon={faClose} />
        </span>
      </STopHeader>
      <SAddressSearch ref={searchRef}></SAddressSearch>
    </SModalOveray>
  );
}

const SModalOveray = styled.div`
  width: 100%;
  position: fixed;
  inset: 0 auto;
  background: rgba(255, 255, 255, 0.3);
  max-width: 500px;
  display: ${(props) => (props.display ? props.display : "none")};
  z-index: 25000;
`;

const SAddressSearch = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh - 48px);
  inset: 48px auto auto auto;
  box-sizing: border-box;
  border-top: 1px solid #d9d9d9;
`;

const STopHeader = styled.div`
  position: absolute;
  width: 100%;
  height: 48px;
  font-size: 24px;
  cursor: pointer;
  text-align: right;
  line-height: 48px;
  background-color: white;
  padding: 0 16px;
  box-sizing: border-box;
  > span {
    cursor: pointer;
  }
`;
