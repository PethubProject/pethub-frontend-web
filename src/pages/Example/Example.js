import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

export default function Example() {
  const navigate = useNavigate();
  return (
    <div id="main">
      <Grid>
        <div
          onClick={(e) => {
            navigate("/example/kakaoaddress");
          }}
        >
          카카오 주소 및 지도
        </div>
        <div
          onClick={(e) => {
            navigate("/example/touchgesture");
          }}
        >
          터치 제스처
        </div>
      </Grid>
    </div>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  > div {
    padding: 8px;
    border: 1px solid black;
    text-align: center;
  }
`;
