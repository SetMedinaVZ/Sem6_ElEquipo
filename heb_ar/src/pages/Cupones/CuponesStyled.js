import styled from "styled-components";

export const Titulo = styled.text`
    /* position: absolute; */
    padding-bottom: 2px;
   
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 28px;

    color: #722017;
`;

export const CuponesLayout = styled.div`
    width: 100%;
    height: 100%;
    /* 
    display: flex;
    flex-direction: column; */

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
`;

export const Cupon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  margin-bottom: 21px;
`;

export const NivelCupon = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #787878;
    width: 100%;
`;

export const TimeText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 48px;
    text-align: center;

    position: absolute;
    z-index: 1;
    
    color: #000000;
`;

export const CuponInfo = styled.div`
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    cursor: pointer;

    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;