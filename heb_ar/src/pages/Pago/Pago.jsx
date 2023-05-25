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

const Pago = ({ cantidadCobrar }) => {
  const navigate = useNavigate();
  const { userDoc } = useAuth();

  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const obtainDiscount = () => {
    return `$${userDoc.puntos * 0.01}`;
  };

  const obtainTotal = () => {
    if (
      cantidadCobrar === 0 ||
      cantidadCobrar === null ||
      cantidadCobrar === undefined
    ) {
      return `$0`;
    }
    if (userDoc.puntos > 0) {
      return `$${cantidadCobrar - userDoc.puntos * 0.01}`;
    } else {
      return `$${cantidadCobrar}`;
    }
  };

  const buttonIsDisabled = () => {
    if (
      cantidadCobrar === 0 ||
      cantidadCobrar === null ||
      cantidadCobrar === undefined
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="w-full ">
      <div onClick={() => navigate(-1)}>
        <Back src={Arrow} alt="Regresar" />
      </div>
      <Titulo>Pago</Titulo>
      <ButtonContainers>
        <GooglePayButton
          environment="TEST"
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
              currencyCode: "USD",
              countryCode: "US",
            },
          }}
          onLoadPaymentData={(paymentRequest) => {
            console.log("load payment data", paymentRequest);
          }}
        />
      </ButtonContainers>
      <TextG>Agrega la información de tu tarjeta</TextG>
      <CreditCardInput />
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
              <TextB>{obtainDiscount()}</TextB>
            </TextWrapper>
            <TextWrapper>
              <TextB>Cupón aplicado</TextB>
              {/* TODO:DESCONTAR CUPON */}
            </TextWrapper>
          </>
        )}
        {toggle && userDoc.puntos === 0 && (
          <TextB>No tienes puntos acumulados</TextB>
        )}
      </ToggleContainer>
      <Footer>
        <TextWrapper>
          <TextB>Total a pagar</TextB>
          <TextB>{obtainTotal()}</TextB>
        </TextWrapper>
        <CheckoutButton disabled={buttonIsDisabled()}>
          Pagar {obtainTotal()}
        </CheckoutButton>
      </Footer>
    </div>
  );
};

export default Pago;
