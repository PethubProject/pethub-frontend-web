import { useCallback, useState } from "react";
import { AddressSearchModal } from "../Modal/Modals";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { styled } from "styled-components";

export default function InputAddress(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [completeData, setCompleteData] = useState({});
  const [detailAddress, setDetailAddress] = useState("");
  const onModalOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const onChangeDetailAddress = useCallback((e) => {
    const { value } = e.target;
    setCompleteData((p) => ({ ...p, detailAddress: detailAddress }));
    setDetailAddress(value);
    props.setData((p) => ({ ...p, detailAddress: detailAddress }));
  }, []);
  return (
    <>
      {!completeData.address ? (
        <SAddressSearchCompleteWrapper>
          <SAddressSearch onClick={onModalOpen}>
            <div>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <div>주소 찾기</div>
          </SAddressSearch>
        </SAddressSearchCompleteWrapper>
      ) : (
        <SAddressSearchCompleteWrapper>
          <div>
            <button onClick={onModalOpen}>주소 변경</button>
          </div>
          <SAddressSearchComplete>
            <div>{completeData.roadAddress}</div>
          </SAddressSearchComplete>
          <SDetailAddressInput type="text" placeholder="상세 주소" value={detailAddress} onChange={onChangeDetailAddress} />
        </SAddressSearchCompleteWrapper>
      )}
      <AddressSearchModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        onComplete={(data) => {
          data = { ...data, detailAddress: "" };
          setCompleteData(data);
          props.setData(data);
        }}
      />
    </>
  );
}

const SAddressSearch = styled.div`
  width: 100%;
  display: flex;
  height: 36px;
  align-items: center;
  gap: 8px;
  padding: 16px;
  box-sizing: border-box;
  border: 1px solid #a9a9a9;
  border-radius: 8px;
  cursor: pointer;
`;
const SAddressSearchComplete = styled(SAddressSearch)`
  border-radius: 8px 8px 0 0;
  border-bottom: none;
  background-color: #e9e9e9;
  overlay: 0.8;
`;
const SDetailAddressInput = styled("input", { type: "text" })`
  height: 36px;
  border-radius: 0 0 8px 8px;
  padding: 0 16px;
  box-sizing: border-box;
  border: 1px solid #a9a9a9;
  font-size: 17px;
`;
const SAddressSearchCompleteWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: ${(props) => (props.margin ? props.margin : "8px 0")};
  padding: 0 16px;
  box-sizing: border-box;
  button {
    background: white;
    border: 1px solid #a9a9a9;
    border-radius: 4px;
    margin: 4px 0;
    padding: 4px 16px;
    font-weight: 500;
  }
`;
