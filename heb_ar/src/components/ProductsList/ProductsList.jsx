import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductCard from "../ProductCard/ProductCard";

const CardListContainer = styled.div`
  overflow-y: scroll;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0 5px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
`;

const ProductsList = (props) => {
  const navigate = useNavigate();

  //Function to navigate to the product page passing the hit data
  const navigateToProduct = (hit) => {
    return () => {
      navigate("/producto", { state: { hit } });
    };
  };

  return (
    <CardListContainer>
      {props.data.map((product) => {
        return (
          <div onClick={navigateToProduct(product)}>
            <ProductCard
              key={product.id}
              cardImg={product.url_img}
              cardName={product.name}
              cardCategory={product.category}
              cardSubCategory={product.subcategory}
            />
          </div>
        );
      })}
    </CardListContainer>
  );
};

export default ProductsList;
