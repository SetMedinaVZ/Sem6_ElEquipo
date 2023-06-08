import React from "react";
import styled from "styled-components";
import CloseImg from "../../assets/icons/close3.svg";
import { QRCodeSVG } from "qrcode.react";

const Section = styled.div`
  width: 80vw;
  height: 50vh;
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border: 10px solid #fcb716;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  margin: 10px;
  background: transparent;
  border: none;
  cursor: pointer;

  & img {
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
  }
`;

const QRCodeModal = (props) => {
  return (
    <Section>
      <CloseButton onClick={props.onButtonClose}>
        <img src={CloseImg} alt="Close button" />
      </CloseButton>
      <QRCodeSVG value={props.qrCode} size={260} />
    </Section>
  );
};

export default QRCodeModal;
