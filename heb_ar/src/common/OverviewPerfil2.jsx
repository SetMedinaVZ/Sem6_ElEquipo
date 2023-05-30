import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as CloseButton } from "../assets/icons/close.svg";
import HEBlogo from "../assets/imgs/logo.svg";
import UserSVG from "../assets/icons/user.svg";
import Info from "../assets/icons/info2.svg";
import User3SVG from "../assets/icons/user3.svg";
import CardSVG from "../assets/icons/card.svg";
import HistorySVG from "../assets/icons/history.svg";
import AyudaSVG from "../assets/icons/ayuda.svg";

import "./OverViewPerfil2.css";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDoc, doc, getDocs, query } from "firebase/firestore";

import { firestore } from '../firebase';
import { useAuth } from "../context/AuthContext";

const Section = styled.div`
  position: absolute;
  width: 100%;
  height: 55%;
  top: -100%; /* start the component offscreen */
  z-index: 100;

  background: var(--hebRed);
  box-shadow: -4px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 20px 20px;
  color: white;

  /* slide-in animation */
  animation: slide-in 0.5s forwards;

  /* slide-out animation */
  &.slide-out {
    animation: slide-out 0.5s forwards;
  }

  @media screen and (min-width: 768px) {
    height: 40%;
  }

  @media screen and (max-height: 800px) {
    height: 65%;
  }

  /* slide-in animation keyframes */
  @keyframes slide-in {
    from {
      top: -100%;
    }
    to {
      top: 0;
    }
  }

  /* slide-out animation keyframes */
  @keyframes slide-out {
    from {
      top: 0;
    }
    to {
      top: -100%;
    }
  }
`;

const Close = styled(CloseButton)`
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5));
`;

const Button = styled.button`
  padding: 0;
  margin: 10px;
  right: 0;
  position: absolute;
  background-color: transparent;
`;

const SubSection1 = styled.div`
  display: flex;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.2);
  mix-blend-mode: normal;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  height: 109px;

  margin-bottom: 15px;
  width: 90%;

  @media screen and (min-width: 768px) {
    margin: 10px;
  }
`;

const Section2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 180px;
  width: 100%;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const Hola = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;

  position: absolute;
  top: 114px;
  width: 100%;
  text-align: center;
  /* left: 80px; */

  @media screen and (min-width: 768px) {
    left: 745px;
    top: 130px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function OverviewPerfil2({ setOpen }) {

  const { currentUser } = useAuth();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [puntos, setPuntos] = useState(0);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () =>{
    const userRef = doc(firestore, 'users', currentUser.uid);
    const userSnap = await getDoc(userRef);

    if(userSnap.exists()){
      // console.log(userSnap.data());

      setApellido(userSnap.data().apellido);
      setNombre(userSnap.data().nombre);
      setPuntos(userSnap.data().puntos)

    }else{
      console.log("undefined");
    }

  }
  
  const [isOpen, setIsOpen] = React.useState(true);

  const handleClose = () => {
    // set the slide-out animation
    setIsOpen(false);
    setOpen();
  };

  return (
    <Section className={isOpen ? "" : "slide-out"}>
      <img className="logo2" src={HEBlogo} alt="heb-logo2" />
      <img className="user-icon" src={UserSVG} alt="user-icon" />
      <Button>
        <Close onClick={handleClose} />
      </Button>
      <Hola>
        <h1 className="Hola">
          Hola, <b>{nombre +" "+ apellido}</b>
        </h1>
      </Hola>
      <Section2>
        <SubSection1>
          <Column className="PuntosDiv">
            <h1>Puntos Acumulados:</h1>
            <img className="info-svg" src={Info} />
          </Column>
          <Column className="PuntosDiv2">
            <h1>{puntos}</h1>
            <h1> Puntos</h1>
          </Column>
        </SubSection1>
        <SubSection1 className="SubItemsDiv">
          <Column>
            <Link to="/perfil">
              <img src={User3SVG} />
              <h1>Perfil</h1>
            </Link>
          </Column>
          <Column>
            <Link to="/metodo">
              <img src={CardSVG} />
              <h1>Método</h1>
            </Link>
          </Column>
          <Column>
            <Link to="/historial">
              <img src={HistorySVG} />
              <h1>Historial</h1>
            </Link>
          </Column>
          <Column>
            <Link to="/ayuda">
              <img src={AyudaSVG} />
              <h1>Ayuda</h1>
            </Link>
          </Column>
        </SubSection1>
      </Section2>
    </Section>
  );
}

export default OverviewPerfil2;
