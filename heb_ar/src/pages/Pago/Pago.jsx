import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Back, Titulo } from "../Perfil/PerfilStyled";
import Arrow from "../../assets/icons/arrow.svg";
import {
  ToggleContainer,
  TextG,
  TextB,
  TextWrapper,
  Footer,
  CheckoutButton,
  ButtonContainers,
} from "./Pago.styled";
import Toggle from "../../components/Toggle/Toggle";
import { useAuth } from "../../context/AuthContext";
import GooglePayButton from "@google-pay/button-react";
import CreditCardInput from "../../components/CardInput/CardInput";
import { firestore } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import MetodoPagoItem from "../../components/MetodoPagoItem/MetodoPagoItem";
import { useMutation } from '@apollo/client';
import { DELETE_CARRITO_USER } from "../../graphql/mutations/deleteCarritoUser";

/**
 *
 * @param {number} cantidadCobrar - Cantidad a cobrar
 * @param {array} carritoA - Array de objetos con los productos del carrito
 * @returns JSX.Element
 */
const Pago = ({ cantidadCobrar, carrito, onClose, descuento, cuponesCanjeados }) => {
  const navigate = useNavigate();
  const { userDoc, currentUser } = useAuth();
  const [jsonData, setJsonData] = useState({});

  const [toggle, setToggle] = useState(true);
  const [defaultCard, setDefaultCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedCard, setAddedCard] = useState(false);

  const [deleteCarritoUser] = useMutation(DELETE_CARRITO_USER);

  const handleDeleteCarritoUser = async () => {
    try {
      console.log(currentUser.uid);
      const { data } = await deleteCarritoUser({
        variables: {
          userId: currentUser.uid,
        },
      });
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const obtainDiscountPorPuntos = () => {
    return `$${userDoc.puntos * 0.01}`;
  };

  const obtainDiscountPorCupones = () => {
    return `$${Math.round(descuento * 100) / 100}`;
  };

  const obtainTotal = () => {
    if (
      cantidadCobrar === 0 ||
      cantidadCobrar === null ||
      cantidadCobrar === undefined
    ) {
      return `$0`;
    }
    if (toggle && userDoc.puntos > 0) {
      //Retorna el total con descuento de puntos y cupones si es que hay
      return Math.round((cantidadCobrar - descuento - userDoc.puntos * 0.01) * 100) / 100;
    } else {
      //Retorna el total con descuento de cupones si es que hay
      return Math.round((cantidadCobrar - descuento) * 100) / 100;
    }
  };

  const buttonIsDisabled = () => {
    if (
      cantidadCobrar === 0 ||
      cantidadCobrar === null ||
      cantidadCobrar === undefined ||
      !defaultCard
    ) {
      return true;
    } else {
      return false;
    }
  };

  const fetchDefaultCard = async () => {
    const collectionRef = collection(
      firestore,
      "users",
      currentUser.uid,
      "payment_methods"
    );
    const q = query(collectionRef, where("default", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setDefaultCard(doc.data());
    });
  };

  const handleCheckout = () => {
    const date = new Date();
    const total = obtainTotal();
    const points = Math.floor(total * 0.1);
    const pointsRemove = Math.floor(userDoc.puntos*0.01);
    const newPoints = userDoc.puntos + points;
    console.log('POINTSREMOVE',pointsRemove);

    const collectionRef = collection(
      firestore,
      "users",
      currentUser.uid,
      "purchase_history"
    );

    addDoc(collectionRef, {
      date: date,
      cost: obtainTotal(),
      productos: jsonData,
      store: "Av. Humberto Lobo",
      qr: "prueba",
    });

    //Update user doc with new points
    const userDocRef = doc(firestore, "users", currentUser.uid);
    updateDoc(userDocRef, {
      puntos: (newPoints-pointsRemove),
    });

    //Update used coupons in user doc to canjeado: true
    const usedCouponsRef = collection(firestore, "users", currentUser.uid, "used_coupons");
    cuponesCanjeados.forEach((cupon) => {
      updateDoc(doc(usedCouponsRef, cupon.id), {
        canjeado: true,
        enCheckout: false,
        fechaCanje: serverTimestamp(),
      });
    });

    //Delete user's cart
    handleDeleteCarritoUser();
    navigate("/compra-exitosa", { state: { voucher: jsonData, puntos: points } });
  };

  useEffect(() => {
    console.log(carrito);
    if (!cantidadCobrar) {
      window.location.reload();
    } else {
      fetchDefaultCard().then(() => {
        setJsonData(
          carrito.map((item) => ({
            Cantidad: item.cantidad,
            Costo: item.precioU,
            Nombre: item.name,
            Pasillo: item.pasillo,
          }))
        )
          setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    fetchDefaultCard();
  }, [addedCard]);

  useEffect(() => {
    console.log("descuento", descuento);
  }, [descuento]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div onClick={() => onClose()}>
            <Back src={Arrow} alt="Regresar" />
          </div>
          <Titulo>Pago</Titulo>
          <ButtonContainers>
            <GooglePayButton
              environment="TEST"
              style={{
                width: "85%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#000000",
                borderRadius: "4px",
              }}
              buttonSizeMode="static"
              buttonType="plain"
              paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                  {
                    type: "CARD",
                    parameters: {
                      allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                      allowedCardNetworks: ["MASTERCARD", "VISA"],
                    },
                    tokenizationSpecification: {
                      type: "PAYMENT_GATEWAY",
                      parameters: {
                        gateway: "example",
                        gatewayMerchantId: "exampleGatewayMerchantId",
                      },
                    },
                  },
                ],
                merchantInfo: {
                  merchantId: "12345678901234567890",
                  merchantName: "Demo Merchant",
                },
                transactionInfo: {
                  totalPriceStatus: "FINAL",
                  totalPriceLabel: "Total",
                  totalPrice: "100.00",
                  currencyCode: "MXN",
                  countryCode: "MX",
                },
              }}
              onLoadPaymentData={(paymentRequest) => {
                console.log("load payment data", paymentRequest);
              }}
            />

            {defaultCard ? (
              <>
                <TextG>O puedes continuar con tu tarjeta</TextG>
                <MetodoPagoItem metodoPago={defaultCard} disableDelete />
              </>
            ) : (
              <>
                <TextG>O agrega la información de tu tarjeta</TextG>
                <CreditCardInput
                  uid={currentUser.uid}
                  setAddedCard={setAddedCard}
                />
              </>
            )}
          </ButtonContainers>

          <ToggleContainer>
            <TextG>¿Quieres utilizar tus puntos en esta compra?</TextG>
            <Toggle handler={handleToggle} />{" "}
            {toggle && userDoc.puntos > 0 && (
              <>
                <TextWrapper>
                  <TextB>Puntos a redimir</TextB>
                  <TextB>{userDoc.puntos}</TextB>
                </TextWrapper>
                <TextWrapper>
                  <TextB>Descuento</TextB>
                  <TextB>{obtainDiscountPorPuntos()}</TextB>
                </TextWrapper>
                <TextWrapper>
                  <TextB>Cupón aplicado</TextB>
                  <TextB>{obtainDiscountPorCupones()}</TextB>
                </TextWrapper>
                <div
                  style={{
                    height: "1px",
                    width: "80%",
                    margin: "10px 0",
                    backgroundColor: "#787878",
                  }}
                />
                <TextWrapper>
                  <TextB>Total a pagar</TextB>
                  <TextB>${obtainTotal()}</TextB>
                </TextWrapper>
              </>
            )}
            {toggle && userDoc.puntos === 0 && (
              <TextB>No tienes puntos acumulados</TextB>
            )}
          </ToggleContainer>
          <Footer>
            <CheckoutButton
              onClick={handleCheckout}
              disabled={buttonIsDisabled()}
            >
              Pagar ${obtainTotal()}
            </CheckoutButton>
          </Footer>
        </>
      )}
    </>
  );
};

export default Pago;
