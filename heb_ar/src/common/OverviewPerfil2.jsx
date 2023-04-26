import React from "react";
import styled from "styled-components";
import { ReactComponent as CloseButton } from "../assets/icons/close.svg";
import HEBlogo from "../assets/imgs/logo.svg";
import UserSVG from "../assets/icons/user.svg";
import Info from "../assets/icons/info2.svg";
import User3SVG from "../assets/icons/user3.svg";
import CardSVG from "../assets/icons/card.svg";
import HistorySVG from "../assets/icons/history.svg";
import AyudaSVG from "../assets/icons/ayuda.svg";


import './OverViewPerfil2.css';

const Section = styled.div`
  position: absolute;
  width: 100%;
  height: 55%;
  top: 0;
  z-index: 3;   

  background: var(--hebRed);
  box-shadow: -4px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 20px 20px;
  color: white;

  @media screen and (min-width: 768px) {
        height: 40%;
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
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;

    position: absolute;
    top: 114px;
    left: 80px;

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

    var Puntos = 1025;
    var Nombre = 'Marcelo Marquez';

  return (
    <Section>
        <img className="logo" src={HEBlogo} alt="heb-logo" />
        <img className="user-icon"  src={UserSVG} alt="user-icon" />
        <Button>
            <Close onClick={setOpen} />
        </Button>
        <Hola>
            <h1 className="Hola">Hola, <b>{Nombre}</b></h1>
        </Hola>
        <Section2>
            <SubSection1>
                <Column className="PuntosDiv">
                    <h1>Puntos Acumulados:</h1>
                    <img className="info-svg" src={Info} />
                </Column>
                <Column className="PuntosDiv2">
                    <h1>{Puntos}</h1>
                    <h1> Puntos</h1>
                </Column>
            </SubSection1>
            <SubSection1 className="SubItemsDiv">
                <Column>
                    <img src={User3SVG} />
                    <h1>Perfil</h1>
                </Column>
                <Column>
                    <img src={CardSVG} />
                    <h1>Método</h1>
                </Column>
                <Column>
                    <img src={HistorySVG} />
                    <h1>Historial</h1>
                </Column>
                <Column>
                    <img src={AyudaSVG} />
                    <h1>Ayuda</h1>
                </Column>
            </SubSection1>
        </Section2>
    </Section>
  );
}

export default OverviewPerfil2;
