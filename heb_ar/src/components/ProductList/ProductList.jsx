import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import styled from 'styled-components'
import test from '../../assets/coca.png';

const CardListContainer = styled.div`
  overflow-y: scroll;
  width: 100%;
  margin-bottom: 90px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const testData = [
  { image: test, name: 'Coca Cola' },
  { image: test, name: 'Coca Cola' },
  { image: test, name: 'Coca Cola' },
  { image: test, name: 'Coca Cola' },
  { image: test, name: 'Coca Cola' },
  { image: test, name: 'Coca Cola' }
];

const ProductList = (props) => {
  return (
    <CardListContainer>
      <Row>
        <ProductCard cardImg={test} cardName='Coca Cola' />
        <ProductCard cardImg={test} cardName='Coca Cola' />
      </Row>
      <Row>
        <ProductCard cardImg={test} cardName='Coca Cola' />
        <ProductCard cardImg={test} cardName='Coca Cola' />
      </Row>
      <Row>
        <ProductCard cardImg={test} cardName='Coca Cola' />
        <ProductCard cardImg={test} cardName='Coca Cola' />
      </Row>
      <Row>
        <ProductCard cardImg={test} cardName='Coca Cola' />
        <ProductCard cardImg={test} cardName='Coca Cola' />
      </Row>
      {/* {testData.map((image, name, index) => {
        return (
          
        )
      })} */}
    </CardListContainer>
  )
}

export default ProductList