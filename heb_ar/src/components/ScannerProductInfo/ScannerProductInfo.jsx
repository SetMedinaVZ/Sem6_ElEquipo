import React, { useState } from "react";
import styled from "styled-components";
import CloseImg from "../../assets/icons/close3.svg";
import Add from "../../assets/icons/add.svg";
import Minus from "../../assets/icons/minus.svg";
import { useMutation } from '@apollo/client';
import { CREATE_CARRITO } from "../../graphql/mutations/createCarrito";
import { useAuth } from "../../context/AuthContext";

const ProductModal = styled.div`
  position: relative;
  /* width: 270px; */
  width: 80vw;
  /* max-height: 527px; */
  height: 70vh;
  background: #ffffff;
  border: 10px solid #fcb716;
  border-radius: 25px;
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  margin: 10px;
  background: transparent;
  border: none;
  cursor: pointer;

  & img {
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
  }
`;

const ProductImg = styled.img`
  margin-top: 10px;
  height: 200px;
`;

const ContainerName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
`;

const ProductName = styled.span`
  font-family: "Inter";
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  padding-bottom: 5px;
`;

const NetCount = styled.span`
  font-family: "Inter";
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  padding: 5px;
`;

const Hr = styled.div`
  width: 80px;
  height: 2px;
  background: black;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ProductInfo = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
  margin-bottom: 90px;
  /* width: 100%; */
  padding: 0 10px;

  & li {
    font-family: "Inter";
    font-weight: 400;
    font-size: 15px;
    padding: 1px;
  }
`;

const ButtonsContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
  width: 100%;
  justify-content: space-evenly;
`;

const PriceAmountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Price = styled.span`
  max-width: 85px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  margin-top: auto;
  color: #000000;
`;

const AmountButton = styled.div`
  width: 90px;
  height: 30px;
  background: #ffc0b1;
  border: 1px solid rgba(114, 32, 23, 0.3);
  border-radius: 40px;
  display: flex;
  margin-top: auto;
  padding: 0 2px;
  align-items: center;
  justify-content: space-around;

  & button {
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;
    box-shadow: none;
  }

  & img {
    width: 14px;
    height: 14px;
  }

  & span {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #722017;
  }
`;

const AddToCart = styled.button`
  width: 135px;
  height: 65px;
  background: #f85a46;
  border-radius: 20px;
  box-shadow: none;
  display: flex;
  justify-content: center;
  text-align: center;

  & span {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 29px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #ffffff;
  }
`;

const ScannerProductInfo = ({ data, onButtonClose, onClose}) => {
  const [createCarrito] = useMutation(CREATE_CARRITO);
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(data.price);
  const { currentUser } = useAuth();

  const handleCreateCarrito = async () => {
    try {
      const { dataC } = await createCarrito({
        variables: {
          cantidad: amount,
          productId: data.id,
          name: data.name,
          size: data.net_cont,
          url_img: data.url_img,
          precioU: data.price,
          userId: currentUser.uid,
          pasillo: data.pasillo,
        },
      });
      onClose();
    } catch (error) {
      console.error('Error updating carrito:', error);
    }
  };

  const minusHandler = () => {
    if (amount > 1) {
      setAmount((prev) => prev - 1);
      setPrice((prev) => prev - data.price);
    }
  };

  const addHandler = () => {
    setAmount((prev) => prev + 1);
    setPrice((prev) => prev + data.price);
  };

  return (
    <ProductModal>
      <CloseButton onClick={onButtonClose}>
        <img src={CloseImg} alt="" />
      </CloseButton>
      <ProductImg src={data.url_img} alt="Product img" />
      <ContainerName>
        {/* <ProductName>{props.name}</ProductName> */}
        <ProductName>{data.name}</ProductName>
        <Hr />
        {/* <NetCount>{props.net_count}</NetCount> */}
        <NetCount>{data.net_cont}</NetCount>
      </ContainerName>
      <ProductInfo>
        <li>Calorias: {data.calories}</li>
        <li>Azucares: {data.sugars}</li>
        <li>Grasas: {data.fats}</li>
      </ProductInfo>
      <ButtonsContainer>
        <PriceAmountContainer>
          <Price>Total: ${price}</Price>
          <AmountButton>
            <button onClick={minusHandler}>
              <img src={Minus} alt="" />
            </button>
            <span>{amount}</span>
            <button onClick={addHandler}>
              <img src={Add} alt="" />
            </button>
          </AmountButton>
        </PriceAmountContainer>
        <AddToCart onClick={handleCreateCarrito}>
          <span>Agregar al carrito</span>
        </AddToCart>
      </ButtonsContainer>
    </ProductModal>
  );
};

export default ScannerProductInfo;
