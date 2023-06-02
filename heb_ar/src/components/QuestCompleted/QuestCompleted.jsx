import React from 'react'
import styled from 'styled-components'

const ProductModal = styled.div`
  position: relative;
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

const ContainerName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
`;

const ProductName = styled.span`
  font-family: "Inter";
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  padding-bottom: 5px;
`;

const NetCount = styled.span`
  font-family: "Inter";
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  padding: 5px;
`;

const QuestCompleted = (props) => {
  return (
    <ProductModal>
      Acabaste wuwuw
    </ProductModal>
  )
}

export default QuestCompleted