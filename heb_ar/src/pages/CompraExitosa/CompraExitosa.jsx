import React, { useEffect, useState } from "react";
import { Back, Titulo } from "../Perfil/PerfilStyled";
import { TextG } from "../Pago/Pago.styled";
import Arrow from "../../assets/icons/arrow.svg";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Check from "../../assets/icons/check.svg";
import QRCode from "react-qr-code";

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

const CompraExitosa = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { voucher, puntos } = location.state;
  const [voucherString, setVoucherString] = useState("");

  useEffect(() => {
    if (voucher === 0 || voucher === null || voucher === undefined) {
      navigate("/carrito");
    } else {
      //Transform to string the voucher
      setVoucherString(JSON.stringify(voucher));
    }
  }, []);

  return (
    <div className="container mx-auto">
      <div onClick={() => navigate(-1)}>
        <Back src={Arrow} alt="Regresar" />
      </div>
      <Titulo2>¡Tu compra ha sido {<br />} exitosa!</Titulo2>
      <img src={Check} style={{ marginTop: "1rem" }} alt="Compra exitosa" />
      <Texto>Puntos generados en tu {<br />} compra:</Texto>
      <Titulo2 style={{ fontSize: "48px", padding: "0", margin: "1rem" }}>
        {puntos + " puntos"}
      </Titulo2>
      <Texto>Favor de presentar este {<br />} código QR en tu salida</Texto>
      <QRCode value={voucherString} />
    </div>
  );
};

export default CompraExitosa;
