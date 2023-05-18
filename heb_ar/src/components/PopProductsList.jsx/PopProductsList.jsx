import React from "react";
import PopProductCard from "../PopProductCard/PopProductCard";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CardListContainer = styled.div`
  overflow-y: scroll;
  width: 100%;
  margin-bottom: 95px;
  padding: 0 5px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
`;

const PopProductList = (props) => {
  const navigate = useNavigate();

  //Function to navigate to the product page passing the hit data
  const navigateToProduct = (hit) => {
    return () => {
      navigate("/producto", { state: { hit } });
    };
  };

  return (
    <CardListContainer>
      {/* <PopProductCard cardImg={test} cardName='Coca Cola' /> */}
      {props.data.map((product) => {
        return (
          <div onClick={navigateToProduct(product)}>
            <PopProductCard
              key={product.id}
              cardImg={product.url_img}
              cardName={product.name}
            />
          </div>
        );
      })}
    </CardListContainer>
  );
};

export default PopProductList;
