import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.div`
  width: 70px;
  height: 70px;
  background: #fddb8a;
  border-radius: 15px;
  padding: 10px;
  box-shadow: none;
  margin: 0 10px 0 10px;
`;

const CategoryName = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 11px;
  line-height: 13px;
  text-align: center;
  margin-top: 1px;
  inline-size: 80px;

  color: var(--gray1);
`;

const SVGIcon = styled.img`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const AisleButton = (props) => {
  return (
    <Link to={props.redirect} >
      <Container>
        <Button>
          <SVGIcon src={props.buttonSVG} />
        </Button>
        <CategoryName>{props.categoryName}</CategoryName>
      </Container>
    </Link>
  );
};

export default AisleButton;
