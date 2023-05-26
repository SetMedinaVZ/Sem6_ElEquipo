import styled from "styled-components";

export const ToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  perspective: 800px;
`;

export const TextG = styled.span`
  font-size: 1rem;
  color: #787878;
  font-weight: bold;
  margin: 1rem 0;
`;

export const TextB = styled.span`
  font-size: 1rem;
  color: black;
  font-weight: bold;
`;

export const TextWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Footer = styled.footer`
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CheckoutButton = styled.button`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  border-color: #de2b27;

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 1.2rem;
  width: 80%;
  padding: 1rem 0;
  color: white;
  background-color: #de2b27;
  margin-top: 1rem;

  &:disabled {
    background-color: #c5c5c5;
    border-color: #c5c5c5;
  }
`;

export const ButtonContainers = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
`;

