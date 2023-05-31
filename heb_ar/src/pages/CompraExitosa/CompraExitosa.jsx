import React from "react";
import { Back, Titulo } from "../Perfil/PerfilStyled";
import { TextG } from "../Pago/Pago.styled";
import Arrow from "../../assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Check from "../../assets/icons/check.svg";

const Titulo2 = styled(Titulo)`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 40px;
  text-align: center;
  color: black;
`;

const Texto = styled(TextG)`
  font-size: 24px;
  text-align: center;
`;

const CompraExitosa = ({cantidadCobrar}) => {
  const navigate = useNavigate();
  
  const obtainPuntos = () => {
    if (
      cantidadCobrar === 0 ||
      cantidadCobrar === null ||
      cantidadCobrar === undefined
    ) {
      return `0`;
    }
    return cantidadCobrar * 0.1;
  };

  return (
    <div className="container mx-auto">
      <div onClick={() => navigate(-1)}>
        <Back src={Arrow} alt="Regresar" />
      </div>
      <Titulo2>¡Tu compra ha sido {<br />} exitosa!</Titulo2>
      <img src={Check} style={{ marginTop: "1rem" }} alt="Compra exitosa" />
      <Texto>Puntos generados en tu {<br />} compra:</Texto>
      <Titulo2 style={{ fontSize: "48px", padding: "0", margin: "1rem" }}>
        {obtainPuntos() + " puntos"}
      </Titulo2>
      <Texto>Favor de presentar este {<br />} código QR en tu salida</Texto>
    </div>
  );
};

export default CompraExitosa;
