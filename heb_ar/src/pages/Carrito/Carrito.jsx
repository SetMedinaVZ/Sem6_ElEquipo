import React, { useEffect, useState} from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
import CarritoCard from "../../components/carrito/carritoCard/carritoCard";
import { CarritoList, Next, Price, Titulo, Space } from "./CarritoStyled"
import { useQuery } from "@apollo/client";
import { GET_CARRITO } from "../../graphql/queries/getCarrito";
import { useAuth } from "../../context/AuthContext";
import Pago from "../Pago/Pago";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { firestore } from "../../firebase";

function Carrito() {
  const { currentUser } = useAuth();
  const [goToCheckout, setgoToCheckout] = useState(false);
  var [PriceTotal, setPriceTotal] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [cuponesCanjeados, setCuponesCanjeados] = useState([]);
  var newPriceTotal = 0;
  const { loading, error, data, refetch} = useQuery(GET_CARRITO,{ variables: { userId: currentUser.uid},fetchPolicy: 'network-only',});
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

  //Obtener cupones canjeados en proceso de canje para que no permita canjear mas
  //de uno del mismo nivel
  const getCuponesCanjeados = async () =>{
    const userCouponsUsedRef = collection(firestore, 'users', currentUser.uid, 'used_coupons');
    const userCouponsUsedQuery = query(userCouponsUsedRef, where("enCheckout", "==", true));
    const userCouponsUsedSnapShot = await getDocs(userCouponsUsedQuery);
    const cuponesEnCanje = userCouponsUsedSnapShot.docs.map(doc => doc.data(), doc.id);
    setCuponesCanjeados(cuponesEnCanje);
  }

  const obtainDiscountFromCoupons =  () => {
    let discount = 0;
    cuponesCanjeados.forEach(cupon => {
      const porcDiscount = cupon.porcValor;
      discount = discount + ((porcDiscount / 100) * newPriceTotal);
    });
    setDescuento(discount);
  }

  useEffect(() => {
    getCuponesCanjeados().then(() => {
      obtainDiscountFromCoupons();
    });
  }, [data]);

  useEffect(() => {
    console.log("cupones canjeados", cuponesCanjeados);
    console.log("descuento", descuento);
  }, [cuponesCanjeados, descuento]);

  useEffect(() => {
    if (!loading && data) {
      setPriceTotal(newPriceTotal);
      console.log("carrito", data.carrito)
    }
  }, [loading, data]);

  const checkout = async () => {
    await refetch();
    setgoToCheckout(true);
  };

  const closeCheckout = () => {
    refetch();
    setgoToCheckout(false);
  };

  if (goToCheckout) {
    return(
      <>
        <Pago carrito ={data.carrito} onClose={closeCheckout} cantidadCobrar={PriceTotal} descuento={descuento} cuponesCanjeados={cuponesCanjeados}/>
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
            <p>${Math.round(PriceTotal * 100) / 100}</p>
          </Price>
          <Next onClick={checkout}>Continuar al checkout</Next>
        </div>
      )}
      <NavBar pagina={'carrito'}/>
    </>
  );
}

export default Carrito;
