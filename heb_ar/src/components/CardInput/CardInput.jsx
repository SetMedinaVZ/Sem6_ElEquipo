import React, { useState } from "react";
import styled from "styled-components";
import { AddPaymentMethodButton } from "../../pages/MetodoPago/MetodoPago";
import { firestore } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const CreditCardForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3vh 0 1vh 0;
`;

const InputWrapper = styled.form`
  display: flex;
  width: 100%;
  margin: 0 -3vw;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;


/**
 * 
 * @param {string} uid - User ID 
 * @param {function} setAddPaymentMethod - Function to set the state of addPaymentMethod in MetodoPago.jsx
 * @param {function} setAddedCard - Function to set the state of addedCard in Pago.jsx
 * @returns {JSX.Element}
 */
const CreditCardInput = ({ uid, setAddPaymentMethod, setAddedCard }) => {
  const [loadingAddPaymentMethod, setLoadingAddPaymentMethod] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isCardDefault, setIsCardDefault] = useState(false);

  const formatCardNumber = (value) => {
    // Remove all non-digits
    const numericValue = value.replace(/\D/g, "");

    // Add spaces every 4 digits
    const formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, "$1 ");

    return formattedValue;
  };

  const formatExpirationDate = (value) => {
    // Remove all non-digits
    const numericValue = value.replace(/\D/g, "");

    // Add slash after 2 digits
    const formattedValue = numericValue.replace(/^(\d{2})/, "$1/");

    return formattedValue;
  };

  const obtainCardType = (value) => {
    // Remove all non-digits
    const numericValue = value.replace(/\D/g, "");

    // Visa
    const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    if (visaRegEx.test(numericValue)) return "Visa";

    // MasterCard
    const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    if (mastercardRegEx.test(numericValue)) return "MasterCard";

    // American Express
    const amexRegEx = /^(?:3[47][0-9]{13})$/;
    if (amexRegEx.test(numericValue)) return "American Express";

    // Discover
    const discoverRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    if (discoverRegEx.test(numericValue)) return "Discover";

    return "";
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = value;

    switch (name) {
      case "cardNumber":
        formattedValue = formatCardNumber(value);
        setCardNumber(formattedValue);
        break;
      case "expirationDate":
        formattedValue = formatExpirationDate(value);
        setExpirationDate(formattedValue);
        break;
      case "cvv":
        setCvv(value);
      default:
        break;
    }
  };

  const addPaymentMethodToFirebase = async () => {
    setLoadingAddPaymentMethod(true);
    const collectionRef = collection(
      firestore,
      "users",
      uid,
      "payment_methods"
    );
    await addDoc(collectionRef, {
      number: cardNumber,
      expiracy_date: expirationDate,
      type: obtainCardType(cardNumber),
      cvv: cvv,
      default: isCardDefault,
    });
    setLoadingAddPaymentMethod(false);
    if (setAddPaymentMethod !== undefined) {
      setAddPaymentMethod(false);
    }
    if (setAddedCard !== undefined) {
      setAddedCard(true);
    }
  };

  return (
    <CreditCardForm>
      <InputWrapper>
        <Input
          type="text"
          name="cardNumber"
          value={cardNumber}
          onChange={handleInputChange}
          placeholder="Número de tarjeta"
          maxLength={19}
          minLength={19}
          required
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="text"
          name="expirationDate"
          value={expirationDate}
          onChange={handleInputChange}
          placeholder="MM/AAAA"
          maxLength={7}
          minLength={7}
          required
        />
        <Input
          type="text"
          name="cvv"
          value={cvv}
          onChange={handleInputChange}
          placeholder="CVV"
          maxLength={4}
          minLength={3}
          required
        />
      </InputWrapper>
      <label htmlFor="default" style={{ margin: "1.2vh 0" }}>
        <input
          type="checkbox"
          name="default"
          id="default"
          onChange={() => setIsCardDefault(!isCardDefault)}
        />{" "}
        ¿Tarjeta por defecto?
      </label>
      <AddPaymentMethodButton
        onClick={addPaymentMethodToFirebase}
        disabled={cardNumber === "" || expirationDate === "" || cvv === ""}
      >
        {loadingAddPaymentMethod ? "Cargando..." : "Agregar"}
      </AddPaymentMethodButton>
    </CreditCardForm>
  );
};

export default CreditCardInput;
