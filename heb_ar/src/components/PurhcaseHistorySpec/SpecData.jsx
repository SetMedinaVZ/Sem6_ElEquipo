import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const SpecContainer = styled.div`
    width: 100%;
    /* height: 20%; */
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 20px;
    padding-bottom: 15px;
    background-color: white;
    border-radius: 0px 0px 20px 20px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const ProductosTitle = styled.h1`

    width: 209px;
    height: 38px;
    margin-left: 12px;
    margin-top: 11px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    text-decoration: underline;

    color: #000000;
`;

const Productos = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    margin-left: 12px;
    margin-right: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: #000000;
`;

const SpecData = (props) => {
  console.log(props.data)

  return (
    <SpecContainer>
      <ProductosTitle>Productos:</ProductosTitle>
        {props.data.map((row)=>(
            <Productos>
                <h1>{row.Nombre} x {row.Cantidad} ({row.Costo} C/u)</h1>
                <h1>{(row.Cantidad*row.Costo).toFixed(2)}</h1>
            </Productos>
        ))}
    </SpecContainer>
  );
};

export default SpecData;
