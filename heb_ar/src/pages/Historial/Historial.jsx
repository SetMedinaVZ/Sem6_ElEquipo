import React, { useEffect, useState } from "react";
// import AppBar from "../../common/AppBar/AppBar";
import Arrow from "../../assets/icons/arrow.svg"
import { Back, Titulo } from "./HistorialStyled"
import styled from "styled-components";
import QRImage from "../../assets/imgs/qr.svg";
import HelpIcon from "../../assets/icons/help.svg";
import "./Historial.css";
import { collection, getDocs, query } from "firebase/firestore";

import { firestore } from '../../firebase';
import { useAuth } from "../../context/AuthContext";

const Container = styled.div`
  width: 88%;
  height: 80vh;// Review for root makeing 50% possible and dynamic

  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  overflow: scroll;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const RowCont = styled.div`
  width: 100%;
  height: 115px;
  display: flex;
  overflow: hidden;
`;

const QRDiv = styled.div`
  width: 30%;
  height: 100%;
  background: #F5F5F5;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const InfoDiv = styled.div`
  width: 50%;
  height: 100%;

  align-items: start;
  padding-left: 10px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  padding-top:10px;
`;

const MoneyDiv = styled.div`
  width: 20%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`;

const Button = styled.button`
  display: flex;
  justify-content:center;;

  background: #FFFFFF;
  border: 0.5px solid rgba(0, 0, 0, 0.7);
  border-radius: 41px;

  @media screen and (max-width: 768px) {
        width: 65px;
        height: 18px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 10px;

          .help-icon{
              width: 10.66px;
              height: 10.53px;
          }
    }
`;

function Historial() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState([{}]);
  useEffect(() => {
    getUserPurchaseHistory();
  }, []);

  const getUserPurchaseHistory = async () =>{
    const userPurchaseHistoryRef = collection(firestore, 'users', currentUser.uid, 'purchase_history');
    const userPurchaseHistoryQuery = query(userPurchaseHistoryRef);
    const userPurchaseHistorySnapshot = await getDocs(userPurchaseHistoryQuery);
    const userPurchaseHistoryData = userPurchaseHistorySnapshot.docs.map(doc => doc.data());

    let data = [];
    userPurchaseHistoryData.forEach(row => {
      let date = new Date(row.date.seconds * 1000);
      let day = date.getDate();
      let month = nombresMes[date.getMonth()-1];
      let year = date.getFullYear();
      let date2 = day + " de " + month + ", " + year;

      let rowToPush = {qr: row.qr, cost: row.cost, date: date2, store: row.store};
      data.push(rowToPush);
    })
    
    setUserData(data);
  }

  const nombresMes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio" ,"Agosto" ,"Septiembre" ,"Octubre" ,"Noviembre" ,"Diciembre"];
  
  return (
    <>
        {/* <AppBar/> */}
        <div className="container">
          <a href="/">
            <Back src={Arrow} alt="Regresar"/>
          </a>
          <Titulo>Historial</Titulo>
          <Container>
            {
              userData.map(row => (
              <><RowCont>
                  <QRDiv>
                    {/* <img className="qr-image" src={QRImage} /> */}
                    <h1>{row.qr}</h1>
                  </QRDiv>
                  <InfoDiv>
                    <div>
                      <h1 className="Fecha">{row.date}</h1>
                      <h1 className="Location">{row.store}</h1>
                    </div>
                    <div className="ButtonDivH">
                      <Button onClick={getUserPurchaseHistory}>
                        Detalles
                      </Button>
                      <a href="/ayuda">
                        <Button>
                          Ayuda
                          <img className="help-icon" src={HelpIcon} />
                        </Button>
                      </a>
                    </div>
                  </InfoDiv>
                  <div className="rectMoney"></div>
                  <MoneyDiv>
                    <h1>{row.cost}</h1>
                    <h1>Mxn</h1>
                  </MoneyDiv>
                </RowCont><div className="rectRow"></div></>
              ))
            }
          </Container>
        </div>
    </>
  );
}

export default Historial;
