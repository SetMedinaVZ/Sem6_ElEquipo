import React, { Fragment, useEffect, useState } from "react";
import { Back, Titulo } from "../Perfil/PerfilStyled";
import Arrow from "../../assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { firestore } from "../../firebase";
import MetodoPagoItem from "../../components/MetodoPagoItem/MetodoPagoItem";
import { collection, getDoc, getDocs, addDoc } from "firebase/firestore";
import styled from "styled-components";
import CardInput from "../../components/CardInput/CardInput";

export const AddPaymentMethodButton = styled.button`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  border-color: #de2b27;

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 1.2rem;

  color: white;
  background-color: #de2b27;
  margin: 1vh 0 2vh 0;

  &:disabled {
    background-color: #c5c5c5;
    border-color: #c5c5c5;
  }
`;

export const MetodoPagoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function MetodoPago() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [addPaymentMethod, setAddPaymentMethod] = useState(false);
  const [delPaymentMethod, setDelPaymentMethod] = useState(false);

  const fetchPaymentMethods = async () => {
    const collectionRef = collection(
      firestore,
      "users",
      currentUser.uid,
      "payment_methods"
    );
    const snapshot = await getDocs(collectionRef);
    const paymentMethods = snapshot.docs.map((doc) => doc.data());
    //add uid of the doc to the payment method
    paymentMethods.forEach((paymentMethod, index) => {
      paymentMethod.id = snapshot.docs[index].id;
    });
    setPaymentMethods(paymentMethods);
  };

  //Fetch payment methods on mount
  useEffect(() => {
    fetchPaymentMethods().then(() => setLoading(false));
  }, []);

  //Fetch payment methods on add
  useEffect(() => {
    fetchPaymentMethods();
  }, [addPaymentMethod]);

  //Fetch payment methods on delete
  useEffect(() => {
    fetchPaymentMethods();
  }, [delPaymentMethod]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <MetodoPagoContainer>
          <div onClick={() => navigate(-1)}>
            <Back src={Arrow} alt="Regresar" />
          </div>
          <Titulo>Método de pago</Titulo>
          <MetodoPagoContainer>
            {paymentMethods.map((paymentMethod) => (
              <MetodoPagoItem
                key={paymentMethod.id}
                userId={currentUser.uid}
                metodoPago={paymentMethod}
                setDelPaymentMethod={setDelPaymentMethod}
              />
            ))}
          </MetodoPagoContainer>
          {addPaymentMethod ? (
              <CardInput
                uid={currentUser.uid}
                setAddPaymentMethod={setAddPaymentMethod}
              />
          ) : (
            <AddPaymentMethodButton onClick={() => setAddPaymentMethod(true)}>
              Agregar método de pago
            </AddPaymentMethodButton>
          )}
        </MetodoPagoContainer>
      )}
    </>
  );
}

export default MetodoPago;
