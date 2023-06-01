import styled from "styled-components";

export const Back = styled.img`
    position: absolute;
    width: 24px;
    height: 24px;
    left: 10px;
    margin-top: 50px;
    transform: scaleX(-1);
`;

export const Titulo = styled.text`
    width: 234px;
    height: 80px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    color: #000000;
    margin-bottom: 22px;
`;

export const Input = styled.input`
  box-sizing: border-box;

  width: 290px;
  height: 40px;

  margin-top: 42px;

  border: 1px solid #D5D5D5;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.20));
  border-radius: 10px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  padding-left: 18px;
  margin-bottom: 16px;
  ::placeholder {
    color: #c5c5c5
  }
`;

export const Button = styled.button`
    margin-top: 10px;
    
    background-color: #009FCE;
    width: 290px;
    height: 38px;
    margin-bottom: 12px;
    display: flex;
    justify-content: center;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 1.20rem;

    color: #FFFFFF;
`;