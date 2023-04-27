import React, { useEffect, useState} from "react";
import "./carritoCard.css";

function CarritoCard({name,priceU,amount,size}) {
    var [priceF, setPriceF] = useState("");
    
    useEffect(() => {
        setPriceF(priceU * amount);
    });

    const sumar = () => {
        setPriceF(amount * priceU)
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
                    <div className='close'></div>
                </div>
                <div className='row'>
                    <h1 className='price'>${priceF}</h1>
                    <div className='amount-container'>
                        <button className='amount-button'>-</button>
                        <h1 className='amount'>{amount}</h1>
                        <button className='amount-button'>+</button>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
  }

export default CarritoCard