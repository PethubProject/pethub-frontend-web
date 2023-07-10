import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef } from "react";
import Modal from "react-modal";
import { styled } from "styled-components";
import BtnRegister from "../Button/BtnRegister";
import BtnClose from "../Button/BtnClose";

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
export function ConfirmModal({ modalIsOpen, close, children,confirm ,registerText}) {

  function closeModal() {
    close();
  }


  return (
    <SModalOveray display={modalIsOpen ? "block" : "none"}>
      <SWrapper>
      <SHeader
       
      >
        <span  onClick={() => {
          closeModal();
        }}>
          <FontAwesomeIcon icon={faClose} />
        </span>
      </SHeader>
      <Sbody>
      {children}
      <div className="btn-wrap">
          <BtnRegister
            text={registerText || "확인"}
            onClick={()=>{
              confirm()
              
            }}
          />
          <BtnClose onClick={() => {
            closeModal()
          }} />
        </div>
      </Sbody>
      </SWrapper>
    </SModalOveray>
  );
}

export function AddressSearchModal({ modalIsOpen, setIsOpen, onComplete = () => {} }) {
  const searchRef = useRef();
  function closeModal() {
    setIsOpen(false);
    
  }
  useEffect(() => {
    if (window.cordova?.InAppBrowser.open) {
      window.open = window.cordova.InAppBrowser.open;
    }
    loadSearchPannel();
  }, []);
  const loadSearchPannel = useCallback(() => {
    if(!searchRef?.current) return 
    new window.daum.Postcode({
      oncomplete: function (data) {
        onComplete(data);
      },
      onclose: function (state) {
        
        if (state === "FORCE_CLOSE") {
        } else if (state === "COMPLETE_CLOSE") {
          
        }
        closeModal();
      },
      width: "100%",
      height: "100%",
      submitMode: false,
    }).embed(searchRef.current);
  }, []);

  return (
    <SModalOveray display={modalIsOpen ? "block" : "none"} >
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
  width: 100vw;
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

const SHeader = styled.div`
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
  border: 1px solid #d9d9d9;
`;

const SWrapper = styled.div`
position: absolute;
width: 100%;
inset: auto auto 50% 50%;
transform:translate(-50%,50%);
box-sizing: border-box;
padding:5%;
background-color:white;

`

const Sbody = styled.div`
border: 1px solid #d9d9d9;
padding:16px;
`