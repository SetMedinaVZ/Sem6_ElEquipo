import React from "react";
import { Back, Titulo } from "../Perfil/PerfilStyled";
import Arrow from "../../assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Titulo2 = styled(Titulo)`
    color: black;
    letter-spacing: 2px;
`;

const CompraExitosa = () => {
  const navigate = useNavigate();

  return (
    <>
      <div onClick={() => navigate(-1)}>
        <Back src={Arrow} alt="Regresar" />
      </div>
      <Titulo2>¡Tu compra ha {<br/>} sido exitosa!</Titulo2>
    </>
  );
};

export default CompraExitosa;
