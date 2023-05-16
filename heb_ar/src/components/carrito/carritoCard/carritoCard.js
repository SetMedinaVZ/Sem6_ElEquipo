import React, { useEffect, useState} from "react";
import "./carritoCard.css";

function CarritoCard({name,priceU,amountI,size}) {
    var [priceF, setPriceF] = useState("");
    var [amount, setAmount] = useState(amountI);
    
    useEffect(() => {
        setPriceF(priceU * amount);
    });

    const sumar = () => {
        setAmount(amount + 1);
        setPriceF(amount * priceU);
    };

    const restar = () => {
        if (amount > 0) {
            setAmount(amount - 1);
            setPriceF(amount);
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
                    <div className='close'></div>
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