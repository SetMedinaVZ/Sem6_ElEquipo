import React from "react";
import styled from "styled-components";
import CloseImg from "../../assets/icons/close3.svg";
import Celebrate from "../../assets/imgs/celebrate.png";

const ProductModal = styled.div`
  /* position: relative; */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* width: 270px; */
  width: 80vw;
  /* max-height: 527px; */
  height: 70vh;
  background: #ffffff;
  border: 10px solid #fcb716;
  border-radius: 25px;
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
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

const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 0 15px;
  margin-top: 40px;
  margin-bottom: 40px;
  height: 100%;
`;

const MainText = styled.span`
  font-family: "Inter";
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  padding-bottom: 5px;
`;

const SecondText = styled.span`
  font-family: "Inter";
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  padding: 5px;
  /* margin-top: 20px; */
`;

const ThirdText = styled.span`
  font-family: "Inter";
  font-weight: 900;
  font-size: 17px;
  text-align: center;
  padding: 5px;
  /* margin-top: 20px; */
`;

const QuestCompleted = (props) => {
  return (
    <ProductModal>
      <CloseButton onClick={props.onCloseButton}>
        <img src={CloseImg} alt="Close button" />
      </CloseButton>
      <ContainerText>
        <img src={Celebrate} alt="Celebration emoji" style={{ width: 100 }} />
        <MainText>
          {props.message}
          {/* ¡Felicidades, completaste el Quest de comprar productos! */}
        </MainText>
        <SecondText>
          {/* Criterio completado: Compra mínima de 10 productos. */}
          Criterio completado: {props.criteria}.
        </SecondText>
        <ThirdText>
          {/* Puntos conseguidos: 100 puntos. */}
          Puntos conseguidos: {props.points} puntos.
        </ThirdText>
      </ContainerText>
    </ProductModal>
  );
};

export default QuestCompleted;
