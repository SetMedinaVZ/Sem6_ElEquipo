import styled from "styled-components";

export const Title = styled.text`
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
`;

export const Date = styled.input` 
  width: 100%;
  
  height: 40px;

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
`;

export const InputDiv = styled.div`
    display: flex;
    width: 290px;
    height: 40px;

    &.inputWithIcon {
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
  }
`;

export const Button = styled.button`
  width: 290px;
  height: 38px;
  margin-bottom: 12px;
  display:flex; 
  justify-content: center;
`;