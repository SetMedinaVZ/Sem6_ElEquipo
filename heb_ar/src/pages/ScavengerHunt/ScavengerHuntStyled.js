import styled from "styled-components";

export const Titulo = styled.text`
    /* position: absolute; */
    padding-top: 44px;
    padding-bottom: 2px;
   
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 28px;

    color: #722017;
`;

export const Back = styled.img`
    position: absolute;
    width: 24px;
    height: 24px;
    left: 14px;
    top: 23px;
    transform: scaleX(-1);
`;

export const Progress = styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;
    
    width: 350px;
    height: 70px;
    left: 20px;
    margin-top: 21px;

    background: #B3E8EF;
    border-radius: 20px;
`;

export const ProgressTxt = styled.text` 
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;

    color: #3F3838;
`;

export const Txt = styled.text` 
    display: flex;
    width: 350px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;


    color: #787878;
`;