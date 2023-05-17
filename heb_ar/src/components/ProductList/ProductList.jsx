import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import styled from 'styled-components'
import test from '../../assets/coca.png';

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

const ProductList = (props) => {
  return (
    <CardListContainer>
        <ProductCard cardImg={test} cardName='Coca Cola' />
        <ProductCard cardImg={test} cardName='Coca Cola' />
        <ProductCard cardImg={test} cardName='Coca Cola' />
        <ProductCard cardImg={test} cardName='Coca Cola' />
        <ProductCard cardImg={test} cardName='Coca Cola' />
        <ProductCard cardImg={test} cardName='Coca Cola' />
        <ProductCard cardImg={test} cardName='Coca Cola' />
        <ProductCard cardImg={test} cardName='Coca Cola' />
    </CardListContainer>
  )
}

export default ProductList