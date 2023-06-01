import styled from "styled-components";

export const Back = styled.img`
    position: absolute;
    width: 24px;
    height: 24px;
    left: 14px;
    top: 23px;
    transform: scaleX(-1);
`;

export const Titulo = styled.h1`
    text-align: center;
    padding-top: 44px;

    margin-top: 6px;
    margin-bottom: 21px;
   
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 28px;

    color: #722017;
`;

export const Center = styled.div`
    display: flex;
    justify-content: center;
`;

export const Container = styled.div`
    width: 88%;
    height: 80vh;// Review for root makeing 50% possible and dynamic

    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    overflow: scroll;

    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const RowCont = styled.div`
    width: 100%;
    height: 115px;
    display: flex;
    justify-content: center;
    overflow: hidden;
`;

export const QRDiv = styled.div`
  width: 30%;
  height: 100%;
  background: #F5F5F5;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const InfoDiv = styled.div`
  width: 50%;
  height: 100%;

  align-items: start;
  padding-left: 10px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  padding-top:10px;
`;

export const Fecha = styled.text `
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;

    color: #722017;
`;

export const Location = styled.text `
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    display: flex;
    align-items: center;

    color: rgba(0, 0, 0, 0.49);
`;

export const MoneyDiv = styled.div`
  width: 20%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`;

export const Button = styled.button`
    display: flex;
    justify-content: center;

    background: #FFFFFF;
    border: 0.5px solid rgba(0, 0, 0, 0.7);
    border-radius: 41px;

    @media screen and (max-width: 768px) {
        width: 79.72px;
        height: 25.26px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 13px;

            .help-icon{
                width: 18.66px;
                height: 18.53px;
            }
    }
`;