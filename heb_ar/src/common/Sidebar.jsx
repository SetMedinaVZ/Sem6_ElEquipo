import React from 'react'
import SidebarButton from './SidebarButton';
import styled from 'styled-components';
import { ReactComponent as CloseButton } from '../assets/icons/close.svg'
import { ReactComponent as LogOutButton } from '../assets/icons/logout.svg'
import { ReactComponent as User } from '../assets/icons/user2.svg'
import { ReactComponent as Chart } from '../assets/icons/chart.svg'
import { ReactComponent as Quest } from '../assets/icons/quest.svg'

const Section = styled.div`
  position: absolute;
  width: 60%;
  height: 100vh;
  right: 0;

  background: var(--hebRed);
  box-shadow: -4px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px 0px 0px 20px;
`;

const Close = styled(CloseButton)`
  margin: 10px;
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
  margin-left: 10px;
  margin-bottom: 10px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #FFFFFF;
`;

const LogOutText = styled.p`
  padding-left: 10px;
`;

function Sidebar() {
  return (
    <>
      <Section>
        <Close />
        <AllButtons>
          <SidebarButton buttonIcon={<User />} buttonText='Mi Perfil' />
          <SidebarButton buttonIcon={<Chart />} buttonText='Gastos Mensuales' />
          <SidebarButton buttonIcon={<Quest />} buttonText='Quests' />
        </AllButtons>
        <LogOut>
          <LogOutButton />
          <LogOutText>Cerrar Sesión</LogOutText>
        </LogOut>
      </Section>
    </>
  )
}

export default Sidebar