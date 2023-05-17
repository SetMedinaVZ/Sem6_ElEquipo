import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProductCard from "../ProductCard/ProductCard";

import test from "../../assets/coca.png";

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
  return (
    <CardListContainer>
      <ProductCard
        cardImg={test}
        cardName="Coca Cola"
        cardCategory="Category"
        cardSubCategory="Subcategory"
      />
    </CardListContainer>
  );
};

export default ProductsList;
