import React, { useEffect, useState} from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
import CarritoCard from "../../components/carrito/carritoCard/carritoCard";
import { CarritoList, Next, Price, Titulo, Space } from "./CarritoStyled"
import { useQuery } from "@apollo/client";
import { GET_CARRITO } from "../../graphql/queries/getCarrito";
import { useAuth } from "../../context/AuthContext";
import Pago from "../Pago/Pago";

function Carrito() {
  const { currentUser } = useAuth();
  const [goToCheckout, setgoToCheckout] = useState(false);
  var [PriceTotal, setPriceTotal] = useState(0);
  var newPriceTotal = 0;
  const { loading, error, data } = useQuery(GET_CARRITO,{ variables: { userId: currentUser.uid},fetchPolicy: 'network-only',});
  let carritoList = [];

  const handleChildChange = (value) => {
    setPriceTotal(PriceTotal + value);
  };

  if (data !== undefined) {
    data.carrito.forEach(product => {
      carritoList.push(<CarritoCard key={product.uid} onChange={handleChildChange} name={product.name} size={product.size} priceU={product.precioU} amountI={product.cantidad} uid={product.uid} url_img={product.url_img}></CarritoCard>);
      newPriceTotal = newPriceTotal + (product.cantidad * product.precioU);
    });
  }

  useEffect(() => {
    if (!loading && data) {
      setPriceTotal(newPriceTotal);
    }
  }, [loading, data]);

  const checkout = () => {
    setgoToCheckout(true);
  };

  const closeCheckout = () => {
    setgoToCheckout(false);
  };

  if (goToCheckout) {
    return(
      <>
        <Pago carrito ={data.carrito} onClose={closeCheckout} cantidadCobrar={PriceTotal}></Pago>
      </>
    )
  }

  return (
    <>
      <AppBar />
      {loading && <p>Loading...</p>}
      {error && <>Error! ${error.message}</>}
      {data && (
        <div className="container">
          <Titulo>Tu Carrito</Titulo>
          <CarritoList>
            {carritoList}
          </CarritoList>
          <Space/>
          <Price>
            <p>Total: </p>
            <p>${PriceTotal}</p>
          </Price>
          <Next onClick={checkout}>Continuar al checkout</Next>
        </div>
      )}
      <NavBar pagina={'carrito'}/>
    </>
  );
}

export default Carrito;
