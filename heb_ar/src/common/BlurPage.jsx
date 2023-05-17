import styled from "styled-components";

const Blur = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100vh;
    background: linear-gradient(167.95deg, rgba(255, 255, 255, 0.49) 99.59%, rgba(255, 255, 255, 0) 100%);
    backdrop-filter: blur(10px);
`;

function BlurPage() {
    return (
        <Blur></Blur>
    );
  }
  
  export default BlurPage;

/* #root > *:not(#CuponPopup) {
    filter: blur(3px);
} */