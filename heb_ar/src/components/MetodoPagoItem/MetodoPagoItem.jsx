import React from "react";
import visaIMG from "../../assets/imgs/visaCard.jpg";
import styled from "styled-components";
import closeIMG from "../../assets/icons/close2.svg";
import { firestore } from "../../firebase";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MetodoPagoItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 85vw;
  border: 1px solid #e5e5e5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  height: 100%;
  margin: 1vh 0;
`;

export const ImgCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 30vw;
  height: 10vh;
`;

export const ImgCard = styled.img`
  width: 75%;
`;

export const MetodoPagoList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const CloseIMG = styled.img`
  height: 20px;
  width: 20px;
  position: absolute;
  right: 10vw;
  margin-top: 5px;
`;

/**
 * 
 * @param metodoPago - Objeto con la información del método de pago
 * @param userId - Id del usuario
 * @param setDelPaymentMethod - Función para actualizar el estado de la lista de métodos de pago al componente padre
 * @param disableDelete - Booleano para deshabilitar el botón de eliminar
 * @returns 
 */
const MetodoPagoItem = ({
  metodoPago,
  userId,
  setDelPaymentMethod,
  disableDelete,
}) => {
  const lastFourDigits = metodoPago.number.slice(-4);

  const deletePaymentMethod = async () => {
    const collectionRef = collection(
      firestore,
      "users",
      userId,
      "payment_methods"
    );
    const docRef = doc(collectionRef, metodoPago.id);
    if (
      window.confirm("¿Estás seguro que deseas eliminar este método de pago?")
    ) {
      await deleteDoc(docRef);
      toast.success("Método de pago eliminado");
      setDelPaymentMethod(true);
    }
  };

  return (
    <MetodoPagoItemContainer>
      <ImgCardContainer>
        <ImgCard src={visaIMG} alt="Visa" />
      </ImgCardContainer>
      <MetodoPagoList>
        <p>Visa {lastFourDigits}</p>
        <p>Fecha de exp. {metodoPago.expiracy_date}</p>
      </MetodoPagoList>
      {disableDelete ? null : (
        <CloseIMG src={closeIMG} onClick={deletePaymentMethod} />
      )}
    </MetodoPagoItemContainer>
  );
};

export default MetodoPagoItem;
