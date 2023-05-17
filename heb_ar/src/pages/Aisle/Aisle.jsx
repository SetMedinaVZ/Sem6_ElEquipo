import React from "react";
import Arrow from "../../assets/icons/arrow.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProductsList from "../../components/ProductsList/ProductsList";

const Back = styled.img`
  position: absolute;
  width: 24px;
  height: 24px;
  left: 14px;
  top: 23px;
  transform: scaleX(-1);
`;

const Titulo = styled.text`
  /* position: absolute; */
  padding-top: 44px;
  padding-bottom: 2px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 28px;

  color: #722017;
`;

const Aisle = (props) => {
  return (
    <>
      <div className="container">
        <Link to="/">
          <Back src={Arrow} />
        </Link>
        <Titulo>Pasillo</Titulo>
        <ProductsList />
      </div>
    </>
  );
};

export default Aisle;
