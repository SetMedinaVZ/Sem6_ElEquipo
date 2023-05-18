import React, { useEffect, useState} from "react";
import { useMutation } from '@apollo/client';
import { POST_CARRITO } from "../../../graphql/mutations/postCarrito";
import { DELETE_CARRITO } from "../../../graphql/mutations/deleteCarrito";
import "./carritoCard.css";

function CarritoCard({name,priceU,amountI,size,uid}) {
    const [deleteCarrito] = useMutation(DELETE_CARRITO);
    const [postCarrito] = useMutation(POST_CARRITO);
    var [priceF, setPriceF] = useState("");
    var [amount, setAmount] = useState(amountI);

    const handleUpdateCarrito = async (cantidad) => {
        try {
          const { data } = await postCarrito({
            variables: {
              uid: uid,
              cantidad: cantidad,
            },
          });
        } catch (error) {
          console.error('Error updating carrito:', error);
        }
    };

    const handleDeleteCarrito = async () => {
      try {
        const { data } = await deleteCarrito({
          variables: {
            uid: uid,
          },
        });

        console.log('Deleted carrito:', data.uid);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };
    
    useEffect(() => {
        setPriceF(priceU * amount);
    });

    const sumar = () => {
        setAmount(amount + 1);
        setPriceF(amount * priceU);
        handleUpdateCarrito(amount+1)
    };

    const restar = () => {
        if (amount > 0) {
            setAmount(amount - 1);
            setPriceF(amount);
            handleUpdateCarrito(amount-1)
        }
    };

    return (
      <>
        <div className='carrito-card-container'>
            <div className='img-placeholder'></div>
            <div className='col'>
                <div className='row'>
                    <div className='col'>
                        <h1 className='product'>{name}</h1>
                        <h1 className='size'>{size}</h1>
                    </div>
                    <div onClick={handleDeleteCarrito} className='close'></div>
                </div>
                <div className='row price-row'>
                    <h1 className='price'>${priceF}</h1>
                    <div className='amount-container'>
                        <button onClick={restar} className='amount-button'>-</button>
                        <h1 className='amount'>{amount}</h1>
                        <button onClick={sumar} className='amount-button'>+</button>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
  }

export default CarritoCard