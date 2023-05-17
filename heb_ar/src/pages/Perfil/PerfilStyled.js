import styled from "styled-components";

export const Titulo = styled.p`
    /* position: absolute; */
    padding-top: 44px;
    padding-bottom: 2px;
   
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    text-align: center;

    color: #722017;
`;

export const InputDiv = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    top: 19px;
    width: 350px;

    /* &.inputWithIcon {
        position: relative;
    }

    .right-icon {
        position: absolute;
        right: 10px;
        top: 50%;
    transform: translateY(-50%);
    svg {
      fill: black;
      transition: 0.3s;
    }
  } */
`;

export const Texto = styled.text`
    /* padding-top: 44px; */
   
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    height: 22px;

    color: #787878;
`;

export const Codigo = styled.input`
    width: 350px;
    height: 40px;
    margin-top: 19px;
    
    border: 1px solid #D5D5D5;
    /* filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.20)); */
    border-radius: 10px;

    color: #C5C5C5;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    padding-left: 18px;
    padding-right: 18px;
    margin-bottom: 16px;
`;

export const Input = styled.input`
    width: 350px;
    height: 40px;
    margin-top: 19px;
    
    border: 1px solid #D5D5D5;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.20));
    border-radius: 10px;

    color: #C5C5C5;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    padding-left: 18px;
    padding-right: 18px;
    margin-bottom: 16px;

    ::placeholder {
    color: #3F3838
  }
`;

export const Fecha = styled.input` 
    width: 100%;
    height: 40px;
    margin-top: 19px;

    border: 1px solid #D5D5D5;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.20));
    border-radius: 10px;

    color: #3F3838;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    padding-left: 18px;
    padding-right: 18px;
    margin-bottom: 16px;
`;

export const Button = styled.button`
    box-sizing: border-box;
    
    position: relative;
    min-width: 350px;
    height: 50px;
    top: 72px;

    background-color: white;

    border: 1px solid #DE2B27;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 10px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    align-items: center;
    padding-left: 16px;

    color: #DE2B27;
`;

export const Back = styled.img`
    position: absolute;
    width: 24px;
    height: 24px;
    left: 14px;
    top: 23px;
    transform: scaleX(-1);
`;