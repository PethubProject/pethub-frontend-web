import { useCallback, useEffect, useRef, useState } from "react";
import logo from "../../resources/image/logo.png";
import { styled } from "styled-components";
import { useScaleChange } from "../../common/hooks";
export default function TouchGesture() {
  const { scale } = useScaleChange();
  const imgRef = useRef();
  useEffect(() => {
    imgRef.current.style.transform = `scale(${scale})`;
  }, [imgRef, scale]);
  return (
    <div id="main">
      <Tmp>
        <img src={logo} ref={imgRef} />
      </Tmp>
    </div>
  );
}

const Tmp = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
