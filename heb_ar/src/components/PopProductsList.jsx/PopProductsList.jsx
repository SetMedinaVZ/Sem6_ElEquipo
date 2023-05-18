import React from 'react'
import PopProductCard from '../PopProductCard/PopProductCard'
import styled from 'styled-components'

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
  return (
    <CardListContainer>
        {/* <PopProductCard cardImg={test} cardName='Coca Cola' /> */}
        {props.data.map((product) => {
          return (
            <PopProductCard 
              key={product.id}
              cardImg={product.url_img}
              cardName={product.name}
            />
          );
        })}
    </CardListContainer>
  )
}

export default PopProductList