import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  width: 170px;
  height: 200px;
  position: relative;
  /* margin: 10px; */

  background: rgba(220, 220, 220, 0.4);
  border-radius: 20px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15));
`;

const CardSection = styled.div`
  width: 140px;
  height: 40px;

  position: absolute;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #FFFFFF;
  border-radius: 10px;
`;

const CardSectionText = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  width: 100%;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: #787878;
`;

const CardImg = styled.img`
  height: 130px;
  position: absolute;
  bottom: -40%;
  left: 50%;
  border-radius: 20px;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const PopProductCard = (props) => {
  return (
    <Card>
      <CardSection>
        <CardImg src={props.cardImg} />
        <CardSectionText>
          {props.cardName}
        </CardSectionText>
      </CardSection>
    </Card>
  )
}

export default PopProductCard