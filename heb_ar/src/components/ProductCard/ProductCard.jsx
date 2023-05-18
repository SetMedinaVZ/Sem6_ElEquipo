import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 170px;
  height: 220px;
  position: relative;
  /* margin: 10px; */

  background: rgba(220, 220, 220, 0.4);
  border-radius: 20px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15));
`;

const CardSection = styled.div`
  width: 140px;
  height: 60px;

  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 10px;
`;

const CardSectionText = styled.p`
  font-family: "Inter";
  width: 100%;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  text-align: center;

  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: #787878;
`;

const CardSectionCategoryText = styled.p`
  font-family: "Inter";
  font-style: normal;
  width: 100%;
  font-weight: 700;
  font-size: 12px;
  line-height: 17px;
  text-align: center;

  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: #787878;
`;

const CardSectionSubCategoryText = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  width: 100%;
  font-size: 11px;
  line-height: 17px;
  text-align: center;

  position: absolute;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: #787878;
`;

const CardImg = styled.img`
  height: 130px;
  position: absolute;
  bottom: 5%;
  left: 50%;
  border-radius: 20px;
  transform: translate(-50%, -50%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const ProductCard = (props) => {
  return (
    <Card>
      <CardSection>
        <CardImg src={props.cardImg} />
        <CardSectionText>{props.cardName}</CardSectionText>
        <CardSectionCategoryText>{props.cardCategory}</CardSectionCategoryText>
        {/* <CardSectionSubCategoryText>{props.cardSubCategory}</CardSectionSubCategoryText> */}
      </CardSection>
    </Card>
  );
};

export default ProductCard;
