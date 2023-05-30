import React from "react";
import SidebarButton from "./SidebarButton";
import styled from "styled-components";
import { ReactComponent as CloseButton } from "../assets/icons/close.svg";
import { ReactComponent as LogOutButton } from "../assets/icons/logout.svg";
import { ReactComponent as User } from "../assets/icons/user2.svg";
import { ReactComponent as Chart } from "../assets/icons/chart.svg";
import { ReactComponent as Quest } from "../assets/icons/quest.svg";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate} from 'react-router-dom';

const Section = styled.div`
  position: absolute;
  width: 60%;
  height: 100%;
  right: 0;
  top: 0;
  z-index: 100;

  background: var(--hebRed);
  box-shadow: -4px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px 0px 0px 20px;

  backdrop-filter: blur(80px);
`;

const Close = styled(CloseButton)`
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5));
`;

const AllButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  margin-top: 40px;
`;

const LogOut = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 10px;
`;

const LogOutText = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #FFFFFF;

  padding-left: 10px;

  @media (max-width: 370px) {
    font-size: 20px;
  }
`;

const Button = styled.button`
  padding: 0;
  margin: 10px;
  background-color: transparent;
`;

function Sidebar({ setOpen }) {
  const { logout } = useAuth();
  
  return (
    <Section>
      <Button>
        <Close onClick={setOpen} />
      </Button>
      <AllButtons>
        <SidebarButton buttonIcon={<User />} buttonText="Mi Perfil" buttonLink="/perfil"/>
        <SidebarButton buttonIcon={<Chart />} buttonText="Gastos Mensuales" buttonLink="/gastos-mensuales"/>
        <SidebarButton buttonIcon={<Quest />} buttonText="Quests" buttonLink="/quests"/>
      </AllButtons>
      <LogOut onClick={logout}>
        <LogOutButton />
        <LogOutText>Cerrar Sesión</LogOutText>
      </LogOut>
    </Section>
  );
}

export default Sidebar;
